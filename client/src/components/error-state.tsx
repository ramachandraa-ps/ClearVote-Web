import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Card className="bg-red-500/10 border border-red-500/20 rounded-xl">
      <CardContent className="p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="text-red-400 w-5 h-5 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-medium text-red-400">Analysis Failed</h3>
            <p className="text-red-300 text-sm mt-1">{message}</p>
            <Button 
              variant="ghost"
              onClick={onRetry}
              className="text-red-400 text-sm font-medium mt-3 hover:text-red-300 p-0 h-auto"
            >
              Try Again
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
