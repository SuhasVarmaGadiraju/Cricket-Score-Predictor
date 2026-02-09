import asyncio
import json
import os
import random
import time
from fastapi import FastAPI
import uvicorn
from normalizer import normalize_cric_event

app = FastAPI()

# Configuration
KAFKA_BROKER = os.getenv("KAFKA_BROKER", "localhost:9092")
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

# Mock Feed Generator (Canned Data)
async def provider_simulator():
    """
    Simulates a live connection to a provider like Sportmonks/CricketAPI
    """
    print("Starting Provider Simulator...")
    match_id = "match_12345"
    overs = 0
    balls = 0
    runs = 0
    wickets = 0
    
    while True:
        # Simulate processing time
        await asyncio.sleep(2) # 2 seconds per ball for demo
        
        # Advance Game State
        balls += 1
        run = random.choice([0, 0, 1, 1, 1, 2, 4, 4, 6, "W"])
        
        current_runs = 0
        if run == "W":
            wickets += 1
        else:
            runs += run
            current_runs = run

        if balls == 6:
            overs += 1
            balls = 0
        
        # Create Raw Event
        raw_event = {
            "id": match_id,
            "inning": 1,
            "over": overs,
            "ball": balls,
            "bowler_id": "bowler_1",
            "batsman_id": "batter_1",
            "runs": 0 if run == "W" else run,
            "extras": 0,
            "wicket": {"out": True} if run == "W" else None,
            "total_runs": runs,
            "total_wickets": wickets
        }
        
        # Normalize
        normalized_event = normalize_cric_event(raw_event)
        
        # In a real app, we would push to Kafka here.
        # producer.send('cricket_feed_normalized', normalized_event)
        
        print(f"Ingested: {normalized_event['score']['overs']} - {run}")
        
        # For MVP Demo - Push directly to Redis PubSub for API service
        # r.publish('match_updates', json.dumps(normalized_event))

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(provider_simulator())

@app.get("/health")
def health():
    return {"status": "ingesting"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
