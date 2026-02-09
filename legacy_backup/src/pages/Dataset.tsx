import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Database, FileText, TrendingUp } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Dataset = () => {
  const { toast } = useToast();

  const datasetInfo = {
    name: "Cricket Match Data (T20 & ODI)",
    rows: "12,847",
    columns: "18",
    size: "3.2 MB",
    format: "CSV",
  };

  const columns = [
    { name: "match_id", type: "Integer", description: "Unique match identifier" },
    { name: "overs", type: "Float", description: "Current over number" },
    { name: "runs", type: "Integer", description: "Current score" },
    { name: "wickets", type: "Integer", description: "Wickets fallen" },
    { name: "run_rate", type: "Float", description: "Current run rate" },
    { name: "last_5_overs", type: "Integer", description: "Runs scored in last 5 overs" },
    { name: "batting_team", type: "String", description: "Team batting" },
    { name: "bowling_team", type: "String", description: "Team bowling" },
    { name: "venue", type: "String", description: "Match venue" },
    { name: "final_score", type: "Integer", description: "Final match score (target)" },
  ];

  const sampleData = [
    { overs: 12.3, runs: 98, wickets: 2, batting_team: "India", bowling_team: "Australia", venue: "Mumbai", final_score: 189 },
    { overs: 15.2, runs: 124, wickets: 4, batting_team: "England", bowling_team: "Pakistan", venue: "Lord's", final_score: 178 },
    { overs: 8.5, runs: 72, wickets: 1, batting_team: "Australia", bowling_team: "New Zealand", venue: "Melbourne", final_score: 201 },
  ];

  const stats = [
    { label: "Total Matches", value: "12,847", icon: Database },
    { label: "Teams Covered", value: "15", icon: TrendingUp },
    { label: "Venues", value: "42", icon: FileText },
    { label: "Time Period", value: "2018-2024", icon: Database },
  ];

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your dataset download will begin shortly",
    });
  };

  return (
    <div className="min-h-screen bg-background magic-cursor">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cricket <span className="gradient-text">Dataset</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Comprehensive cricket match data used for ML model training
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center card-hover">
                    <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Dataset Info */}
          <Card className="p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{datasetInfo.name}</h2>
                <p className="text-muted-foreground">
                  Ball-by-ball and over-by-over data from international cricket matches
                </p>
              </div>
              <Button onClick={handleDownload} className="animate-pulse-glow">
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-muted/50 rounded-lg">
              {Object.entries(datasetInfo).slice(1).map(([key, value]) => (
                <div key={key}>
                  <p className="text-xs text-muted-foreground uppercase mb-1">{key}</p>
                  <p className="text-lg font-bold">{value}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Column Info */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Dataset Columns</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Column Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Type</th>
                    <th className="text-left py-3 px-4 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {columns.map((col, index) => (
                    <motion.tr
                      key={col.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono text-sm text-primary">{col.name}</td>
                      <td className="py-3 px-4 text-sm">{col.type}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{col.description}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Sample Data */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Sample Data</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-semibold">Overs</th>
                    <th className="text-left py-2 px-3 font-semibold">Runs</th>
                    <th className="text-left py-2 px-3 font-semibold">Wickets</th>
                    <th className="text-left py-2 px-3 font-semibold">Batting Team</th>
                    <th className="text-left py-2 px-3 font-semibold">Bowling Team</th>
                    <th className="text-left py-2 px-3 font-semibold">Venue</th>
                    <th className="text-left py-2 px-3 font-semibold">Final Score</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-2 px-3">{row.overs}</td>
                      <td className="py-2 px-3">{row.runs}</td>
                      <td className="py-2 px-3">{row.wickets}</td>
                      <td className="py-2 px-3">{row.batting_team}</td>
                      <td className="py-2 px-3">{row.bowling_team}</td>
                      <td className="py-2 px-3">{row.venue}</td>
                      <td className="py-2 px-3 font-bold text-primary">{row.final_score}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Showing 3 of {datasetInfo.rows} rows
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dataset;
