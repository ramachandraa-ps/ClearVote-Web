import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface HistoryItem {
  id: string;
  title: string;
  createdAt: string;
}

interface HistoryPreviewProps {
  history: HistoryItem[];
}

export default function HistoryPreview({ history }: HistoryPreviewProps) {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Recent Analyses</h3>
        </div>
        {history.length > 0 ? (
          <div className="space-y-3">
            {history.map((item) => (
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
        ) : (
          <div className="text-center py-6 text-muted-foreground text-sm">
            No analysis history yet
          </div>
        )}
      </CardContent>
    </Card>
  );
} 