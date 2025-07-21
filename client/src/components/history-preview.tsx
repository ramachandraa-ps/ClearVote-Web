import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, Check, X } from "lucide-react";
import type { AnalysisResponse } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

interface HistoryPreviewProps {
  history: AnalysisResponse[];
}

export default function HistoryPreview({ history }: HistoryPreviewProps) {
  if (!history || history.length === 0) {
    return (
      <Card className="bg-card rounded-xl border border-border">
        <CardContent className="p-6 text-center">
          <History className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No analysis history yet</p>
          <p className="text-sm text-muted-foreground/70 mt-1">Your analyzed proposals will appear here</p>
        </CardContent>
      </Card>
    );
  }

  const recentHistory = history.slice(0, 3); // Show only 3 most recent

  return (
    <Card className="bg-card rounded-xl border border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <History className="text-primary w-5 h-5 mr-2" />
            Summary History
          </h3>
          {history.length > 3 && (
            <Button 
              variant="ghost" 
              className="text-primary text-sm font-medium hover:text-primary/80 p-0 h-auto"
            >
              View All
            </Button>
          )}
        </div>
        
        <div className="space-y-3">
          {recentHistory.map((item) => {
            const isYes = item.analysis.recommendation === "YES";
            const timeAgo = formatDistanceToNow(new Date(item.analysis.createdAt), { addSuffix: true });
            
            return (
              <div 
                key={item.analysis.id} 
                className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-background transition-colors cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {item.proposal.title || 'Untitled Proposal'}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{timeAgo}</div>
                </div>
                <div className="flex items-center space-x-2 ml-3">
                  <Badge 
                    variant={isYes ? "default" : "destructive"}
                    className={`${
                      isYes 
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/30' 
                        : 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30'
                    }`}
                  >
                    {isYes ? (
                      <Check className="w-3 h-3 mr-1" />
                    ) : (
                      <X className="w-3 h-3 mr-1" />
                    )}
                    {item.analysis.recommendation}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
