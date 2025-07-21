import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, FileText, Info, Share, Bookmark } from "lucide-react";
import type { AnalysisResponse, KeyDetails } from "@shared/schema";

interface AnalysisResultsProps {
  result: AnalysisResponse;
  onNewAnalysis: () => void;
}

export default function AnalysisResults({ result, onNewAnalysis }: AnalysisResultsProps) {
  const { analysis } = result;
  const keyDetails = analysis.keyDetails as KeyDetails;
  const isYes = analysis.recommendation === "YES";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'DAO Proposal Analysis',
          text: `Recommendation: ${analysis.recommendation}\n\n${analysis.summary}`,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      const shareText = `DAO Proposal Analysis\n\nRecommendation: ${analysis.recommendation}\n\n${analysis.summary}`;
      navigator.clipboard.writeText(shareText);
    }
  };

  const handleSave = () => {
    // In a real app, this would save to user's favorites or bookmarks
    console.log('Save analysis:', analysis.id);
  };

  return (
    <div className="space-y-6">
      {/* Vote Recommendation */}
      <Card className="bg-card rounded-xl border border-border overflow-hidden">
        <div className={`${isYes ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'} border-b p-6`}>
          <div className="flex items-center justify-center space-x-4">
            <div className={`w-16 h-16 ${isYes ? 'bg-green-500' : 'bg-red-500'} rounded-2xl flex items-center justify-center`}>
              {isYes ? (
                <Check className="text-white w-8 h-8" />
              ) : (
                <X className="text-white w-8 h-8" />
              )}
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${isYes ? 'text-green-400' : 'text-red-400'}`}>
                {analysis.recommendation}
              </div>
              <div className={`text-sm font-medium ${isYes ? 'text-green-400/80' : 'text-red-400/80'}`}>
                Recommended Vote
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <p className="text-card-foreground text-sm leading-relaxed">
            {analysis.reasoning}
          </p>
        </CardContent>
      </Card>

      {/* Summary Section */}
      <Card className="bg-card rounded-xl border border-border">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <FileText className="text-primary w-5 h-5 mr-2" />
            Proposal Summary
          </h3>
          <div className="prose prose-sm max-w-none">
            <p className="text-card-foreground leading-relaxed whitespace-pre-line">
              {analysis.summary}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Key Details */}
      <Card className="bg-card rounded-xl border border-border">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Info className="text-primary w-5 h-5 mr-2" />
            Key Differences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-background rounded-xl p-4">
              <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Budget Impact</div>
              <div className="text-lg font-semibold text-foreground mt-1">{keyDetails.budgetImpact}</div>
            </div>
            <div className="bg-background rounded-xl p-4">
              <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Duration</div>
              <div className="text-lg font-semibold text-foreground mt-1">{keyDetails.duration}</div>
            </div>
            <div className="bg-background rounded-xl p-4">
              <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Risk Level</div>
              <div className={`text-lg font-semibold mt-1 ${
                keyDetails.riskLevel === 'Low' ? 'text-green-400' : 
                keyDetails.riskLevel === 'Medium' ? 'text-yellow-400' : 
                'text-red-400'
              }`}>
                {keyDetails.riskLevel}
              </div>
            </div>
            <div className="bg-background rounded-xl p-4">
              <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Category</div>
              <div className="text-lg font-semibold text-foreground mt-1">{keyDetails.category}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex space-x-3">
        <Button 
          variant="outline"
          onClick={handleShare}
          className="flex-1 bg-background text-foreground py-3 px-4 rounded-xl font-medium hover:bg-muted transition-colors border-border"
        >
          <Share className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button 
          onClick={handleSave}
          className="flex-1 bg-primary text-primary-foreground py-3 px-4 rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          <Bookmark className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>
    </div>
  );
}
