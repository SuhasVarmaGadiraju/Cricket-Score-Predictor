import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload as UploadIcon, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a CSV file",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
      setUploaded(false);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    setUploading(true);

    // Simulate upload and processing
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
      toast({
        title: "Upload Successful!",
        description: "Your dataset has been uploaded and is ready for analysis",
      });
    }, 2000);
  };

  const handleRetrain = () => {
    toast({
      title: "Model Retraining Started",
      description: "This may take a few minutes. You'll be notified when complete.",
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
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Upload <span className="gradient-text">Dataset</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload your own cricket dataset to improve predictions
            </p>
          </div>

          {/* Upload Card */}
          <Card className="p-8 mb-8">
            <div className="space-y-6">
              {/* File Input Area */}
              <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".csv"
                  onChange={handleFileSelect}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <UploadIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-semibold mb-2">
                      {file ? file.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      CSV files only (max 10MB)
                    </p>
                  </motion.div>
                </label>
              </div>

              {/* File Info */}
              {file && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  {uploaded && (
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  )}
                </motion.div>
              )}

              {/* Upload Button */}
              <Button
                onClick={handleUpload}
                disabled={!file || uploading || uploaded}
                className="w-full animate-pulse-glow"
                size="lg"
              >
                {uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                    Uploading...
                  </>
                ) : uploaded ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Upload Complete
                  </>
                ) : (
                  <>
                    <UploadIcon className="w-5 h-5 mr-2" />
                    Upload Dataset
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Dataset Preview */}
          {uploaded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Dataset Preview</h2>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <p className="text-2xl font-bold">1,247</p>
                    <p className="text-sm text-muted-foreground">Rows</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">Columns</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <p className="text-2xl font-bold">98%</p>
                    <p className="text-sm text-muted-foreground">Valid Data</p>
                  </div>
                </div>

                {/* Sample Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 font-semibold">Overs</th>
                        <th className="text-left py-2 px-3 font-semibold">Runs</th>
                        <th className="text-left py-2 px-3 font-semibold">Wickets</th>
                        <th className="text-left py-2 px-3 font-semibold">Team</th>
                        <th className="text-left py-2 px-3 font-semibold">Final Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { overs: 10.2, runs: 82, wickets: 1, team: "India", final: 178 },
                        { overs: 14.5, runs: 118, wickets: 3, team: "Australia", final: 192 },
                        { overs: 8.3, runs: 67, wickets: 2, team: "England", final: 165 },
                      ].map((row, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="py-2 px-3">{row.overs}</td>
                          <td className="py-2 px-3">{row.runs}</td>
                          <td className="py-2 px-3">{row.wickets}</td>
                          <td className="py-2 px-3">{row.team}</td>
                          <td className="py-2 px-3 font-bold text-primary">{row.final}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Retrain Model */}
              <Card className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Retrain Model</h3>
                    <p className="text-muted-foreground mb-4">
                      Upload complete! You can now retrain the ML model with your dataset to improve prediction accuracy.
                      This process may take several minutes.
                    </p>
                    <Button onClick={handleRetrain} variant="outline">
                      Start Model Retraining
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Requirements */}
          <Card className="p-8 mt-8">
            <h2 className="text-xl font-bold mb-4">Dataset Requirements</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>CSV format with proper headers (overs, runs, wickets, batting_team, bowling_team, venue, final_score)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>Minimum 500 rows for effective training</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>No missing values in critical columns</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>Maximum file size: 10MB</span>
              </li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Upload;
