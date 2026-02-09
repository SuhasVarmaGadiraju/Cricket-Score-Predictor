from datetime import datetime

def normalize_cric_event(provider_data):
    """
    Normalizes raw data from hypothetical provider to our internal schema.
    """
    # This is a mock function. Real logic depends on provider structure.
    # Creating a sample internal event.
    return {
        "match_id": provider_data.get("id", "unknown"),
        "timestamp": datetime.utcnow().isoformat(),
        "inning": provider_data.get("inning", 1),
        "over": provider_data.get("over", 0),
        "ball_in_over": provider_data.get("ball", 1),
        "delivery": {
            "bowler_id": provider_data.get("bowler_id"),
            "batsman_id": provider_data.get("batsman_id"),
            "non_striker_id": provider_data.get("non_striker_id"),
            "runs_batsman": provider_data.get("runs", 0),
            "extras": provider_data.get("extras", 0),
            "wicket": provider_data.get("wicket"), # Object or None
            "shot_type": "unknown", # Needs detailed feed
            "ball_pitch_location": {"x": 0.0, "y": 0.0}
        },
        "score": {
            "runs": provider_data.get("total_runs", 0),
            "wickets": provider_data.get("total_wickets", 0),
            "overs": f"{provider_data.get('over', 0)}.{provider_data.get('ball', 0)}"
        }
    }
