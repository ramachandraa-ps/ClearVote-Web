import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={`bg-card text-card-foreground rounded-lg border border-border shadow-sm ${className || ""}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }: CardProps) {
  return (
    <div className={`p-6 pt-0 ${className || ""}`} {...props}>
      {children}
    </div>
  );
} 