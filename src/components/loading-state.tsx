import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function LoadingState() {
  return (
    <Card className="w-full">
      <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[200px]">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Analyzing proposal...</p>
      </CardContent>
    </Card>
  );
} 