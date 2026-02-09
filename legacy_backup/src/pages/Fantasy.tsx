
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, UserPlus, X, Trophy, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { PLAYERS, Player } from "@/lib/data";

const Fantasy = () => {
    const { toast } = useToast();
    const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState<{ totalPoints: number; mvp: Player } | null>(null);

    const togglePlayer = (player: Player) => {
        if (selectedPlayers.find(p => p.id === player.id)) {
            setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
        } else {
            if (selectedPlayers.length >= 11) {
                toast({
                    title: "Team Full",
                    description: "You can only select 11 players",
                    variant: "destructive",
                });
                return;
            }
            setSelectedPlayers([...selectedPlayers, player]);
        }
    };

    const handlePredict = () => {
        if (selectedPlayers.length < 11) {
            toast({
                title: "Incomplete Team",
                description: `You need 11 players. Currently Selected: ${selectedPlayers.length}`,
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        setTimeout(() => {
            // Mock logic
            const totalPoints = selectedPlayers.reduce((sum, p) => sum + p.fantasyPointsAvg, 0);
            // Randomize slightly
            const randomizedPoints = Math.round(totalPoints * (0.9 + Math.random() * 0.2));

            // Find MVP (Highest avg points)
            const mvp = selectedPlayers.reduce((prev, current) => (prev.fantasyPointsAvg > current.fantasyPointsAvg) ? prev : current);

            setPrediction({
                totalPoints: randomizedPoints,
                mvp: mvp
            });
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background magic-cursor">
            <Navigation />

            <div className="container mx-auto px-4 pt-24 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">
                            Fantasy <span className="gradient-text">Team Predictor</span>
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Build your Dream 11 and get AI performance projections
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Player Selection List */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Available Players</h2>
                                <Badge variant="secondary">{selectedPlayers.length}/11 Selected</Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {PLAYERS.map(player => {
                                    const isSelected = selectedPlayers.some(p => p.id === player.id);
                                    return (
                                        <motion.div
                                            key={player.id}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Card
                                                className={`p-4 cursor-pointer transition-colors ${isSelected ? 'border-primary bg-primary/10' : 'hover:border-primary/50'}`}
                                                onClick={() => togglePlayer(player)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="text-2xl">{player.image}</div>
                                                        <div>
                                                            <p className="font-bold">{player.name}</p>
                                                            <p className="text-xs text-muted-foreground">{player.role} • Avg Pts: {player.fantasyPointsAvg}</p>
                                                        </div>
                                                    </div>
                                                    {isSelected ? <X className="text-primary h-5 w-5" /> : <UserPlus className="text-muted-foreground h-5 w-5" />}
                                                </div>
                                            </Card>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Team Preview & Prediction */}
                        <div className="space-y-6">
                            <Card className="p-6 border-accent/20 bg-muted/30 sticky top-24">
                                <h2 className="text-xl font-bold mb-4">Your Team Summary</h2>

                                <div className="space-y-2 mb-6">
                                    {selectedPlayers.length === 0 && <p className="text-sm text-muted-foreground italic">No players selected.</p>}
                                    {selectedPlayers.map(p => (
                                        <div key={p.id} className="flex justify-between text-sm">
                                            <span>{p.name}</span>
                                            <span className="text-muted-foreground">{p.role}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    className="w-full mb-6 bg-gradient-to-r from-accent to-primary"
                                    onClick={handlePredict}
                                    disabled={loading || selectedPlayers.length !== 11}
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : "Predict Team Points"}
                                </Button>

                                <AnimatePresence>
                                    {prediction && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="space-y-4 pt-4 border-t border-border"
                                        >
                                            <div className="text-center">
                                                <p className="text-sm text-muted-foreground uppercase">Projected Total</p>
                                                <div className="text-5xl font-bold gradient-text">{prediction.totalPoints}</div>
                                                <p className="text-xs text-muted-foreground">Fantasy Points</p>
                                            </div>

                                            <div className="bg-card p-4 rounded-lg flex items-center space-x-3 border border-border">
                                                <div className="p-2 bg-yellow-500/20 rounded-full">
                                                    <Trophy className="text-yellow-500 w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Predicted MVP</p>
                                                    <p className="font-bold">{prediction.mvp.name}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Card>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Fantasy;
