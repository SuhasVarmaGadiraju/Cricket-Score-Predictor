import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2, TrendingUp, Trophy, MapPin, Gauge } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { TEAMS, VENUES, Team, Venue } from "@/lib/data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PredictionResult {
  predicted_score: number;
  min_score: number;
  max_score: number;
  win_probability: number;
  par_score: number;
  graph_data: any[];
}

const Predict = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [mode, setMode] = useState<'international' | 'ipl'>('international');

  // Filter teams based on mode
  const currentTeams = TEAMS.filter(t => t.type === mode);

  const [formData, setFormData] = useState({
    overs: "",
    runs: "",
    wickets: "",
    batting_team: "",
    bowling_team: "",
    venue: "",
  });

  // Reset form when mode changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, batting_team: "", bowling_team: "" }));
    setResult(null);
  }, [mode]);

  const handlePredict = async () => {
    if (!formData.overs || !formData.runs || !formData.wickets || !formData.batting_team || !formData.bowling_team || !formData.venue) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate Calculation Delay
    setTimeout(() => {
      const overs = parseFloat(formData.overs);
      const runs = parseInt(formData.runs);
      const wickets = parseInt(formData.wickets);
      const venue = VENUES.find(v => v.id === formData.venue) as Venue;
      const battingTeam = TEAMS.find(t => t.id === formData.batting_team) as Team;
      const bowlingTeam = TEAMS.find(t => t.id === formData.bowling_team) as Team;

      // 1. Base Projection (Run Rate)
      const currentRunRate = runs / (overs || 1); // Avoid div by zero
      const remainingOvers = 20 - overs;

      // 2. Adjustments
      // Venue Factor: If venue has high avg score, boost projection
      const venueFactor = venue.avgFirstInningsScore / 160;

      // Wicket Factor: Exponential decay for wickets lost
      // 0-2 wickets: minimal impact, 3-5: moderate, 6+: severe
      const wicketsRemaining = 10 - wickets;
      const resourcePercentage = (wicketsRemaining * 10) + (remainingOvers * 5); // Simplified D/L logic concept
      const resourceFactor = Math.min(1, resourcePercentage / 150) + 0.2;

      // Team Strength Differential
      // e.g. Ind (95) vs Ire (70) -> diff 25 -> 25/500 = 0.05 boost
      const strengthDiff = (battingTeam.strength - bowlingTeam.strength) / 500;

      // Final Calc
      let projectedRuns = runs + (currentRunRate * remainingOvers * venueFactor * resourceFactor * (1 + strengthDiff));

      // Clamp to realistic values: at least 6 RPO for remaining if wickets in hand, or basically current score if 10 wkts
      if (wickets >= 10) projectedRuns = runs;
      else projectedRuns = Math.max(runs + (remainingOvers * 3), projectedRuns);

      const predictedScore = Math.round(projectedRuns);

      // Win Probability (Mock logic based on par score)
      const parScore = venue.parScore;
      // If batting first, higher score = higher win prob vs par
      // This is a simplification. Usually win prob depends on target vs current.
      // We'll assume "Win Probability for Batting Team" to reach a winning total or defend.
      // Let's frame it as: Probability of reaching Par Score.
      let winProb = 50 + ((predictedScore - parScore) / parScore) * 100;
      winProb = Math.min(99, Math.max(1, winProb));

      // Generate Graph Data (The "Worm")
      const graphData = [];
      let currentScore = 0;
      for (let i = 0; i <= 20; i++) {
        const parAtOver = (parScore / 20) * i;

        if (i <= overs) {
          // Historical (Linear approx for visual simplicity)
          currentScore = (runs / (overs || 1)) * i;
        } else {
          // Projected
          currentScore = runs + ((predictedScore - runs) / (20 - overs)) * (i - overs);
        }

        graphData.push({
          over: i,
          Projected: Math.round(currentScore),
          Par: Math.round(parAtOver),
        });
      }

      setResult({
        predicted_score: predictedScore,
        min_score: Math.round(predictedScore * 0.92),
        max_score: Math.round(predictedScore * 1.08),
        win_probability: Math.round(winProb),
        par_score: parScore,
        graph_data: graphData
      });

      setLoading(false);
      toast({ title: "Prediction Complete!" });
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
          {/* Header & Mode Toggle */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Score <span className="gradient-text">Predictor</span>
              </h1>
              <p className="text-muted-foreground">Advanced ML-driven match analytics</p>
            </div>

            <div className="flex items-center space-x-4 bg-muted/50 p-2 rounded-full border border-border">
              <span className={`text-sm font-semibold transition-colors ${mode === 'international' ? 'text-primary' : 'text-muted-foreground'}`}>INTL</span>
              <Switch
                checked={mode === 'ipl'}
                onCheckedChange={(checked) => setMode(checked ? 'ipl' : 'international')}
              />
              <span className={`text-sm font-semibold transition-colors ${mode === 'ipl' ? 'text-primary' : 'text-muted-foreground'}`}>IPL 2025</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card className="p-8 h-fit border-primary/20">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-accent" /> Match Scenario
              </h2>

              <div className="space-y-6">
                {/* Venue */}
                <div className="space-y-2">
                  <Label>Venue</Label>
                  <Select value={formData.venue} onValueChange={(v) => setFormData({ ...formData, venue: v })}>
                    <SelectTrigger><SelectValue placeholder="Select Stadium" /></SelectTrigger>
                    <SelectContent>
                      {VENUES.map((v) => <SelectItem key={v.id} value={v.id}>{v.name}, {v.city}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                {/* Teams */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Batting</Label>
                    <Select value={formData.batting_team} onValueChange={(v) => setFormData({ ...formData, batting_team: v })}>
                      <SelectTrigger><SelectValue placeholder="Team A" /></SelectTrigger>
                      <SelectContent>
                        {currentTeams.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Bowling</Label>
                    <Select value={formData.bowling_team} onValueChange={(v) => setFormData({ ...formData, bowling_team: v })}>
                      <SelectTrigger><SelectValue placeholder="Team B" /></SelectTrigger>
                      <SelectContent>
                        {currentTeams.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Match State */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Overs</Label>
                    <Input type="number" step="0.1" max="20" placeholder="10.2" value={formData.overs} onChange={e => setFormData({ ...formData, overs: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Runs</Label>
                    <Input type="number" placeholder="85" value={formData.runs} onChange={e => setFormData({ ...formData, runs: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Wickets</Label>
                    <Input type="number" max="10" placeholder="2" value={formData.wickets} onChange={e => setFormData({ ...formData, wickets: e.target.value })} />
                  </div>
                </div>

                <Button
                  onClick={handlePredict}
                  disabled={loading}
                  className="w-full mt-4 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all font-bold text-lg h-12"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Simulate Outcome"}
                </Button>
              </div>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    {/* Score Card */}
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-6 bg-gradient-to-br from-card to-primary/10 border-primary/40 text-center">
                        <p className="text-sm font-medium text-muted-foreground uppercase">Projected Score</p>
                        <h3 className="text-6xl font-bold gradient-text my-2">{result.predicted_score}</h3>
                        <div className="flex justify-center gap-2 text-sm font-mono text-muted-foreground bg-background/50 py-1 px-3 rounded-full mx-auto w-fit">
                          <span>{result.min_score}</span>
                          <span>-</span>
                          <span>{result.max_score}</span>
                        </div>
                      </Card>

                      {/* Win Gauge */}
                      <Card className="p-6 flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-accent/5" />
                        <Gauge className="w-8 h-8 text-accent mb-2" />
                        <div className="text-4xl font-bold">{result.win_probability}%</div>
                        <p className="text-xs text-muted-foreground mt-1">Win Probability</p>
                        <div className="w-full h-2 bg-muted mt-3 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent transition-all duration-1000"
                            style={{ width: `${result.win_probability}%` }}
                          />
                        </div>
                      </Card>
                    </div>

                    {/* Worm Graph */}
                    <Card className="p-6">
                      <h4 className="font-semibold mb-4 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-primary" /> Match Trajectory
                      </h4>
                      <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={result.graph_data}>
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                            <XAxis dataKey="over" />
                            <YAxis domain={[0, 'auto']} />
                            <Tooltip
                              contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                              itemStyle={{ color: '#fff' }}
                            />
                            <Line type="monotone" dataKey="Projected" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                            <Line type="monotone" dataKey="Par" stroke="#6b7280" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex justify-center gap-6 mt-2 text-xs">
                        <div className="flex items-center"><div className="w-3 h-3 bg-primary rounded-full mr-2"></div> Projected</div>
                        <div className="flex items-center"><div className="w-3 h-3 bg-zinc-500 rounded-full mr-2"></div> Par Score</div>
                      </div>
                    </Card>

                  </motion.div>
                ) : (
                  <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-xl">
                    <MapPin className="w-16 h-16 mb-4 opacity-20" />
                    <p>Enter match details to visualize predictions</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Predict;
