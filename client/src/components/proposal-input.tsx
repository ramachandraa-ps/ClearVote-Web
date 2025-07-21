import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Sparkles } from "lucide-react";

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
  onClear 
}: ProposalInputProps) {
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    setCharacterCount(content.length);
  }, [content]);

  const isNearLimit = characterCount > 4500;
  const isAtLimit = characterCount >= 5000;

  return (
    <Card className="bg-card rounded-xl border border-border">
      <CardContent className="p-6">
        <div className="mb-6">
          <Label htmlFor="proposal-input" className="block text-sm font-medium text-foreground mb-3">
            Document Upload
          </Label>
          <div className="relative">
            <Textarea
              id="proposal-input"
              placeholder="Paste your DAO proposal here..."
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              className={`w-full h-48 p-4 resize-none text-sm leading-relaxed bg-background border-border text-foreground placeholder:text-muted-foreground ${
                isNearLimit 
                  ? 'border-orange-300 focus:ring-orange-500' 
                  : 'focus:ring-primary'
              }`}
              maxLength={5000}
            />
            <div className={`absolute bottom-3 right-3 text-xs ${
              isAtLimit ? 'text-red-500' : isNearLimit ? 'text-orange-500' : 'text-muted-foreground'
            }`}>
              {characterCount}/5000
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost"
            onClick={onClear}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            disabled={!content}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
          <Button 
            onClick={onSummarize}
            disabled={!content.trim() || isAtLimit}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Summarize Proposal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
