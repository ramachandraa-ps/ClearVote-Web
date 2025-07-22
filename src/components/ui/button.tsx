import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline" | "link";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors";
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    link: "underline-offset-4 hover:underline text-primary",
  };
  const sizeClasses = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ""}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
} 