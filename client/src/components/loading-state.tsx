import { Card, CardContent } from "@/components/ui/card";

export default function LoadingState() {
  return (
    <Card className="bg-card rounded-xl border border-border">
      <CardContent className="p-8 text-center">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-foreground font-medium">Analyzing proposal...</p>
        <p className="text-sm text-muted-foreground mt-2">This may take a few seconds</p>
      </CardContent>
    </Card>
  );
}
