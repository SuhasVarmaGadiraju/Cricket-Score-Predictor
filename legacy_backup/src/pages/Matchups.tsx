
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Swords, Loader2, CircleSlash, Target, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import { PLAYERS, Player } from "@/lib/data";

const Matchups = () => {
    const [batter, setBatter] = useState<string>("");
    const [bowler, setBowler] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState<any | null>(null);

    const batters = PLAYERS.filter(p => p.role === 'Batsman' || p.role === 'WicketKeeper' || p.role === 'All-Rounder');
    const bowlers = PLAYERS.filter(p => p.role === 'Bowler' || p.role === 'All-Rounder');

    const analyzeMatchup = () => {
        if (!batter || !bowler) return;
        setLoading(true);

        setTimeout(() => {
            // Mock Data Generation
            const batP = PLAYERS.find(p => p.id === batter);
            const bowlP = PLAYERS.find(p => p.id === bowler);

            // Random deterministic stats based on name lengths (just to be consistent)
            const seed = (batP?.name.length || 0) + (bowlP?.name.length || 0);

            setStats({
                ballsFaces: 30 + (seed * 2),
                runsScored: 35 + seed,
                dismissals: seed % 3,
                strikeRate: 100 + (seed * 5),
                dotBallPercentage: 40 - (seed % 10),
                prediction: seed % 2 === 0 ? "Batsman Dominates" : "Bowler has the Edge"
            });
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-background magic-cursor">
            <Navigation />

            <div className="container mx-auto px-4 pt-24 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">
                            Player <span className="gradient-text">Matchups</span>
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Head-to-head analysis of key battles
                        </p>
                    </div>

                    <Card className="p-8 mb-8 border-primary/20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Select Batter</label>
                                <Select value={batter} onValueChange={setBatter}>
                                    <SelectTrigger className="h-14 text-lg"><SelectValue placeholder="Batter" /></SelectTrigger>
                                    <SelectContent>
                                        {batters.map(p => <SelectItem key={p.id} value={p.id}>{p.image} {p.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex justify-center flex-col items-center">
                                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-2">
                                    <Swords className="w-6 h-6 text-accent" />
                                </div>
                                <Button onClick={analyzeMatchup} disabled={loading || !batter || !bowler} size="lg" className="rounded-full px-8">
                                    {loading ? <Loader2 className="animate-spin" /> : "Analyze"}
                                </Button>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Select Bowler</label>
                                <Select value={bowler} onValueChange={setBowler}>
                                    <SelectTrigger className="h-14 text-lg"><SelectValue placeholder="Bowler" /></SelectTrigger>
                                    <SelectContent>
                                        {bowlers.map(p => <SelectItem key={p.id} value={p.id}>{p.image} {p.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </Card>

                    {stats && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        >
                            <Card className="p-6 text-center card-hover border-red-500/20">
                                <Target className="w-8 h-8 text-red-500 mx-auto mb-2" />
                                <div className="text-3xl font-bold">{stats.dismissals}</div>
                                <div className="text-xs text-muted-foreground uppercase">Dismissals</div>
                            </Card>
                            <Card className="p-6 text-center card-hover border-blue-500/20">
                                <Zap className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                <div className="text-3xl font-bold">{stats.strikeRate}</div>
                                <div className="text-xs text-muted-foreground uppercase">Strike Rate</div>
                            </Card>
                            <Card className="p-6 text-center card-hover border-green-500/20">
                                <div className="text-3xl mb-2">🏏</div>
                                <div className="text-3xl font-bold">{stats.runsScored}</div>
                                <div className="text-xs text-muted-foreground uppercase">Runs (off {stats.ballsFaces} balls)</div>
                            </Card>
                            <Card className="p-6 text-center card-hover border-yellow-500/20 bg-yellow-500/5">
                                <div className="text-3xl mb-2">🏆</div>
                                <div className="text-lg font-bold text-yellow-600">{stats.prediction}</div>
                                <div className="text-xs text-muted-foreground uppercase">AI Verdict</div>
                            </Card>
                        </motion.div>
                    )}

                </motion.div>
            </div>
        </div>
    );
};

export default Matchups;
