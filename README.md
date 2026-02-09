# Cricket Prediction Pro

## Project Overview
Cricket Prediction Pro is an enterprise realtime analytics platform. It replaces the previous lightweight predictor with a microservices architecture capable of handling live data streams and complex ML inference.

## Directory Structure

- **/ingest**: Python service to connect to cricket data providers (Sportmonks/CricketAPI), normalize data, and push to the message bus.
- **/api**: Node.js + Socket.IO server to broadcast normalized events to web clients.
- **/web-client**: Vite + React + Tailwind frontend with Neon Dark Mode and 3D components.
- **/ml**: Python Machine Learning engine for Win Probability, Player Impact, and Next Ball predictions.
- **/infrastructure**: Docker Compose files for Postgres, Redis, and service orchestration.

## Getting Started (MVP)

### Prerequisites
- Node.js 18+
- Python 3.9+
- Docker & Docker Compose

### Running the Full Stack
1. Navigate to `/infrastructure`.
2. Run `docker-compose up --build`.
3. Access the web client at `http://localhost:8080`.

### Running Locally (Development)

**1. API Service**
```bash
cd api
npm install
node index.js
```
Runs on port 3000.

**2. Web Client**
```bash
cd web-client
npm install
npm run dev
```
Runs on port 8080.

**3. Ingest Service (Mock)**
```bash
cd ingest
pip install -r requirements.txt
python main.py
```

## Features Implemented (Scaffold)
- [x] Docker Architecture
- [x] React + Vite + Neon Theme Canvas
- [x] Socket.IO Realtime Bridge
- [x] 3D Card & Butterfly Effect UI Stubs
- [x] Basic Python Ingest Pipeline

See `pitch.md` for the full 50-feature roadmap.
