import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Vote, History, Plus, Settings } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import ProposalInput from "@/components/proposal-input";
import AnalysisResults from "@/components/analysis-results";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";
import HistoryPreview from "@/components/history-preview";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { AnalysisResponse } from "@shared/schema";

type AppState = "input" | "loading" | "error" | "results";

export default function Home() {
  const [state, setState] = useState<AppState>("input");
  const [proposalContent, setProposalContent] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Mock user ID for demo purposes - in real app this would come from auth
  const userId = "demo-user-123";

  const { data: history } = useQuery({
    queryKey: ["/api/history", userId],
    enabled: true
  });

  const analyzeMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await apiRequest("POST", "/api/analyze", {
        content,
        userId,
        title: content.split('\n')[0].substring(0, 100) // Use first line as title
      });
      return response.json();
    },
    onSuccess: (data: AnalysisResponse) => {
      setAnalysisResult(data);
      setState("results");
      queryClient.invalidateQueries({ queryKey: ["/api/history"] });
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
      setState("error");
    }
  });

  const handleSummarize = () => {
    if (!proposalContent.trim()) {
      setErrorMessage("Please enter a proposal to analyze");
      setState("error");
      return;
    }
    
    if (proposalContent.length > 5000) {
      setErrorMessage("Proposal content must be less than 5000 characters");
      setState("error");
      return;
    }

    setState("loading");
    analyzeMutation.mutate(proposalContent);
  };

  const handleClear = () => {
    setProposalContent("");
    setState("input");
    setAnalysisResult(null);
    setErrorMessage("");
  };

  const handleRetry = () => {
    if (proposalContent.trim()) {
      handleSummarize();
    } else {
      setState("input");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                <h1 className="text-xl font-bold text-foreground">CleanVote</h1>
                <p className="text-sm text-muted-foreground">DAO Governance Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setState("input")}
                className="p-2 text-muted-foreground hover:text-foreground"
              >
                <History className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mobile: Show different layout */}
          <div className="lg:hidden">
            {state === "input" && (
              <>
                <ProposalInput
                  content={proposalContent}
                  onContentChange={setProposalContent}
                  onSummarize={handleSummarize}
                  onClear={handleClear}
                />
                <HistoryPreview history={history || []} />
              </>
            )}

            {state === "loading" && <LoadingState />}

            {state === "error" && (
              <ErrorState 
                message={errorMessage}
                onRetry={handleRetry}
              />
            )}

            {state === "results" && analysisResult && (
              <>
                <AnalysisResults 
                  result={analysisResult}
                  onNewAnalysis={() => setState("input")}
                />
                <HistoryPreview history={history || []} />
              </>
            )}
          </div>

          {/* Desktop: Side-by-side layout */}
          <div className="hidden lg:block space-y-6">
            {state === "input" && (
              <ProposalInput
                content={proposalContent}
                onContentChange={setProposalContent}
                onSummarize={handleSummarize}
                onClear={handleClear}
              />
            )}

            {state === "loading" && <LoadingState />}

            {state === "error" && (
              <ErrorState 
                message={errorMessage}
                onRetry={handleRetry}
              />
            )}

            {state === "results" && analysisResult && (
              <AnalysisResults 
                result={analysisResult}
                onNewAnalysis={() => setState("input")}
              />
            )}
          </div>

          {/* Right Column - History & Info */}
          <div className="hidden lg:block space-y-6">
            <HistoryPreview history={history || []} />
            
            {/* Info Panel */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">How to Use CleanVote</h3>
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
                  <p>Click "Summarize" to get AI-powered analysis</p>
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
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button - Only show on mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <Button
          onClick={state === "results" ? () => setState("input") : scrollToTop}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all duration-200"
          size="sm"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
