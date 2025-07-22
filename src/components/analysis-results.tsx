import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertTriangle, Bookmark, Share2, PlusCircle } from "lucide-react";
import type { AnalysisResponse } from "@shared/schema";

interface AnalysisResultsProps {
  result: AnalysisResponse;
  onNewAnalysis: () => void;
}

export default function AnalysisResults({ result, onNewAnalysis }: AnalysisResultsProps) {
  const { analysis } = result;
  const isPositive = analysis.recommendation === "YES";

  const recommendationIcon = isPositive ? (
    <CheckCircle className="h-6 w-6 text-green-500" />
  ) : (
    <XCircle className="h-6 w-6 text-red-500" />
  );

  const getKeyDetailIcon = (key: string) => {
    switch (key) {
      case "budgetImpact":
        return "💰";
      case "duration":
        return "⏱️";
      case "riskLevel":
        return "⚠️";
      case "category":
        return "📋";
      default:
        return "ℹ️";
    }
  };

  const keyDetails = analysis.keyDetails as Record<string, string>;

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          {recommendationIcon}
          <h2 className="text-lg font-semibold text-foreground">
            {isPositive ? "Recommended to Vote YES" : "Recommended to Vote NO"}
          </h2>
        </div>

        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">Summary</h3>
          <p className="text-sm text-muted-foreground">{analysis.summary}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">Key Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(keyDetails).map(([key, value]) => (
              <div key={key} className="flex items-start gap-2 p-3 bg-accent/10 rounded-md">
                <div className="text-lg">{getKeyDetailIcon(key)}</div>
                <div>
                  <p className="text-xs font-medium capitalize">{key}</p>
                  <p className="text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">Reasoning</h3>
          <p className="text-sm text-muted-foreground">{analysis.reasoning}</p>
        </div>

        <div className="flex flex-wrap gap-2 justify-between mt-6">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Bookmark className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
          <Button onClick={onNewAnalysis} className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            New Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 