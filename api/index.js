const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const { createClient } = require('redis');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all for MVP
        methods: ["GET", "POST"]
    }
});

// Redis Client for PubSub (Simulating Bus)
// const subscriber = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
// subscriber.connect();

// Mock Data Emitter for Demo purposes (since we might not run python ingest instantly)
let mockMatchState = {
    match_id: "demo-match-1",
    timestamp: new Date().toISOString(),
    inning: 1,
    over: 5,
    ball_in_over: 2,
    score: { runs: 45, wickets: 1, overs: "5.2" },
    delivery: {
        batsman_id: "b1",
        bowler_id: "bo1",
        runs_batsman: 0
    },
    win_probability: { teamA: 0.55, teamB: 0.45 },
    projected_score: 165
};

setInterval(() => {
    // Simulate Game State Change
    const runs = Math.floor(Math.random() * 7); // 0-6
    mockMatchState.score.runs += runs;
    mockMatchState.delivery.runs_batsman = runs;
    mockMatchState.ball_in_over++;

    if (mockMatchState.ball_in_over > 6) {
        mockMatchState.ball_in_over = 1;
        mockMatchState.over++;
        mockMatchState.score.overs = `${mockMatchState.over}.0`;
    } else {
        mockMatchState.score.overs = `${mockMatchState.over}.${mockMatchState.ball_in_over}`;
    }

    // Win Prob Swing
    const swing = (Math.random() - 0.5) * 0.05;
    mockMatchState.win_probability.teamA += swing;
    mockMatchState.win_probability.teamB = 1 - mockMatchState.win_probability.teamA;

    io.emit('match_update', mockMatchState);
}, 2000);

/* Real Implementation would be:
subscriber.subscribe('match_updates', (message) => {
    const event = JSON.parse(message);
    io.emit('match_update', event);
});
*/

io.on('connection', (socket) => {
    console.log('a user connected');
    // Send immediate state
    socket.emit('match_update', mockMatchState);
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
