
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCw, Activity, Radio } from "lucide-react";
import Navigation from "@/components/Navigation";
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

const LiveMatch = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [wickets, setWickets] = useState(0);
    const [overs, setOvers] = useState(0);
    const [balls, setBalls] = useState(0);
    const [commentary, setCommentary] = useState<string[]>([]);
    const [history, setHistory] = useState<{ balls: number, score: number }[]>([]);

    const scrollRef = useRef<HTMLDivElement>(null);

    const events = [
        { type: 'dot', score: 0, text: "No run, played straight to the fielder." },
        { type: 'run', score: 1, text: "Single taken, good rotation of strike." },
        { type: 'run', score: 1, text: "Quick single! That was close." },
        { type: 'run', score: 2, text: "Two runs, good running between the wickets." },
        { type: 'run', score: 4, text: "FOUR! Beautiful shot through the covers!" },
        { type: 'run', score: 4, text: "FOUR! Edged but flies to the boundary." },
        { type: 'run', score: 6, text: "SIX! That's huge! Out of the stadium!" },
        { type: 'wicket', score: 0, text: "OUT! Clean bowled! What a delivery!" },
        { type: 'wicket', score: 0, text: "OUT! Caught at mid-on! Gone!" },
    ];

    useEffect(() => {
        let interval: any;
        if (isPlaying && wickets < 10 && overs < 20) {
            interval = setInterval(() => {
                playBall();
            }, 1500);
        }
        return () => clearInterval(interval);
    }, [isPlaying, wickets, overs, balls]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [commentary]);

    const playBall = () => {
        // Determine Event Weighted Randomly
        const r = Math.random();
        let event;
        if (r > 0.95) event = events.filter(e => e.type === 'wicket')[Math.floor(Math.random() * 2)];
        else if (r > 0.85) event = events.filter(e => e.score === 6)[0];
        else if (r > 0.75) event = events.filter(e => e.score === 4)[Math.floor(Math.random() * 2)];
        else if (r > 0.4) event = events.filter(e => e.score === 1 || e.score === 2)[Math.floor(Math.random() * 3)];
        else event = events[0];

        // Update State
        setScore(s => s + event.score);
        if (event.type === 'wicket') setWickets(w => w + 1);

        setBalls(b => {
            const newBalls = b + 1;
            if (newBalls % 6 === 0) {
                setOvers(o => o + 1);
                setCommentary(c => [...c, `End of Over ${overs + 1}. Score: ${score + event.score}/${wickets + (event.type === 'wicket' ? 1 : 0)}`]);
            }
            return newBalls;
        });

        setCommentary(c => [...c, `${overs}.${balls % 6 + 1}: ${event.text}`]);
        setHistory(h => [...h, { balls: balls + 1, score: score + event.score }]);
    };

    const resetMatch = () => {
        setIsPlaying(false);
        setScore(0);
        setWickets(0);
        setOvers(0);
        setBalls(0);
        setCommentary([]);
        setHistory([]);
    };

    return (
        <div className="min-h-screen bg-background magic-cursor">
            <Navigation />

            <div className="container mx-auto px-4 pt-24 pb-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Center Stage: Scoreboard */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="p-8 bg-gradient-to-br from-card to-primary/5 border-primary/20 relative overflow-hidden">
                            <div className="absolute top-4 right-4 flex space-x-2">
                                <Badge variant="outline" className="animate-pulse flex items-center gap-1 border-red-500 text-red-500">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div> LIVE
                                </Badge>
                            </div>

                            <div className="text-center space-y-2">
                                <p className="text-xl text-muted-foreground uppercase tracking-widest">India vs Australia</p>
                                <div className="text-8xl font-bold gradient-text tracking-tighter">
                                    {score}/{wickets}
                                </div>
                                <div className="text-2xl font-mono text-muted-foreground">
                                    Overs: {Math.floor(balls / 6)}.{balls % 6}  <span className="text-sm mx-2">•</span> CRR: {balls > 0 ? (score / (balls / 6)).toFixed(2) : '0.00'}
                                </div>
                            </div>

                            <div className="flex justify-center gap-4 mt-8">
                                {!isPlaying ? (
                                    <Button size="lg" className="w-40 rounded-full text-lg animate-pulse-glow" onClick={() => setIsPlaying(true)}>
                                        <Play className="mr-2 fill-current" /> Start
                                    </Button>
                                ) : (
                                    <Button size="lg" variant="destructive" className="w-40 rounded-full text-lg" onClick={() => setIsPlaying(false)}>
                                        <Pause className="mr-2 fill-current" /> Pause
                                    </Button>
                                )}
                                <Button variant="outline" size="icon" className="rounded-full" onClick={resetMatch}>
                                    <RotateCw className="w-5 h-5" />
                                </Button>
                            </div>
                        </Card>

                        {/* Live Chart */}
                        <Card className="p-6 h-[300px]">
                            <div className="h-full w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={history}>
                                        <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} dot={false} isAnimationActive={false} />
                                        <YAxis domain={[0, 'auto']} hide />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>

                    {/* Commentary Feed */}
                    <Card className="p-0 overflow-hidden flex flex-col h-[600px] border-l-4 border-l-primary/50">
                        <div className="p-4 bg-muted/50 border-b border-border flex items-center gap-2 font-bold">
                            <Radio className="w-4 h-4 text-primary" /> Commentary
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth" ref={scrollRef}>
                            {commentary.length === 0 && <p className="text-muted-foreground text-center mt-20">Match about to start...</p>}
                            {commentary.map((c, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i}
                                    className="text-sm p-3 rounded-lg bg-muted/30 border border-border/50"
                                >
                                    {c}
                                </motion.div>
                            ))}
                        </div>
                    </Card>

                </div>
            </div>
        </div>
    );
};

export default LiveMatch;
