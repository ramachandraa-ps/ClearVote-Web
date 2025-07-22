import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, X } from "lucide-react";

interface ProposalInputProps {
  content: string;
  onContentChange: (content: string) => void;
  onSummarize: () => void;
  onClear: () => void;
}

export default function ProposalInput({
  content,
  onContentChange,
  onSummarize,
  onClear,
}: ProposalInputProps) {
  return (
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
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className="w-full min-h-[200px] p-3 text-sm border border-border rounded-md bg-background text-foreground resize-y"
            placeholder="Paste your proposal text here..."
          />
          {content && (
            <button
              onClick={onClear}
              className="absolute top-2 right-2 p-1 rounded-full bg-background hover:bg-muted"
              aria-label="Clear input"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={onSummarize} className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Analyze
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 