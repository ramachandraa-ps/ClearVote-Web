import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Vote, History, Plus, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

// Mock data for demonstration
const mockHistory = [
  { id: "1", title: "Proposal for Treasury Management", createdAt: "2023-10-15T12:00:00Z" },
  { id: "2", title: "Community Fund Allocation", createdAt: "2023-10-10T14:30:00Z" },
  { id: "3", title: "Governance Structure Update", createdAt: "2023-10-05T09:15:00Z" }
];

export default function Home() {
  const [proposalContent, setProposalContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    if (!proposalContent.trim()) {
      alert("Please enter a proposal to analyze");
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const handleClear = () => {
    setProposalContent("");
    setShowResults(false);
  };

  const handleNewAnalysis = () => {
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Vote className="text-primary-foreground w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">ClearVote</h1>
                <p className="text-sm text-muted-foreground">DAO Governance Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Main Content */}
          <div className="space-y-6">
            {!isAnalyzing && !showResults ? (
              <Card className="w-full">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-foreground">Paste DAO Proposal</h2>
                    <p className="text-sm text-muted-foreground">
                      Paste your proposal text below to get an AI-powered analysis
                    </p>
                  </div>
                  <div className="relative">
                    <textarea
                      value={proposalContent}
                      onChange={(e) => setProposalContent(e.target.value)}
                      className="w-full min-h-[200px] p-3 text-sm border border-border rounded-md bg-background text-foreground resize-y"
                      placeholder="Paste your proposal text here..."
                    />
                    {proposalContent && (
                      <button
                        onClick={handleClear}
                        className="absolute top-2 right-2 p-1 rounded-full bg-background hover:bg-muted"
                        aria-label="Clear input"
                      >
                        <Plus className="h-4 w-4 text-muted-foreground rotate-45" />
                      </button>
                    )}
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button onClick={handleAnalyze} className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Analyze
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : isAnalyzing ? (
              <Card className="w-full">
                <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[200px]">
                  <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
                  <p className="text-muted-foreground">Analyzing proposal...</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="w-full">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-6 w-6 text-green-500">✓</div>
                    <h2 className="text-lg font-semibold text-foreground">
                      Recommended to Vote YES
                    </h2>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-md font-medium mb-2">Summary</h3>
                    <p className="text-sm text-muted-foreground">
                      This proposal outlines a comprehensive plan for treasury management that includes 
                      diversification of assets, improved transparency measures, and regular reporting.
                      The proposal is well-structured with clear implementation steps.
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-md font-medium mb-2">Key Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start gap-2 p-3 bg-accent/10 rounded-md">
                        <div className="text-lg">💰</div>
                        <div>
                          <p className="text-xs font-medium">Budget Impact</p>
                          <p className="text-sm">Low (5% of treasury)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-3 bg-accent/10 rounded-md">
                        <div className="text-lg">⏱️</div>
                        <div>
                          <p className="text-xs font-medium">Duration</p>
                          <p className="text-sm">6 months</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-3 bg-accent/10 rounded-md">
                        <div className="text-lg">⚠️</div>
                        <div>
                          <p className="text-xs font-medium">Risk Level</p>
                          <p className="text-sm">Low</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-3 bg-accent/10 rounded-md">
                        <div className="text-lg">📋</div>
                        <div>
                          <p className="text-xs font-medium">Category</p>
                          <p className="text-sm">Treasury</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button onClick={handleNewAnalysis} className="flex items-center gap-1">
                      <Plus className="h-4 w-4" />
                      New Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - History & Info */}
          <div className="space-y-6">
            <Card className="w-full">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <History className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground">Recent Analyses</h3>
                </div>
                <div className="space-y-3">
                  {mockHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 border border-border rounded-md hover:bg-accent/10 cursor-pointer"
                    >
                      <p className="font-medium text-sm text-foreground truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Info Panel */}
            <Card className="w-full">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">How to Use ClearVote</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-xs font-bold">1</span>
                    </div>
                    <p>Paste your DAO proposal text into the input area</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-xs font-bold">2</span>
                    </div>
                    <p>Click "Analyze" to get AI-powered analysis</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-xs font-bold">3</span>
                    </div>
                    <p>Review the voting recommendation and key details</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-xs font-bold">4</span>
                    </div>
                    <p>Share or save the analysis for future reference</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 