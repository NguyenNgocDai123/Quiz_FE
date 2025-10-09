"use client";

import * as React from "react";
import { cn } from "@/utils/cn"; // import utils

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl font-medium transition-colors shadow-sm",
        variant === "default" && "bg-indigo-600 text-white hover:bg-indigo-700",
        variant === "outline" &&
          "border border-gray-300 text-gray-700 hover:bg-gray-100",
        variant === "ghost" && "text-gray-600 hover:bg-gray-100",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2 text-base",
        size === "lg" && "px-6 py-3 text-lg",
        className
      )}
      {...props}
    />
  );
}
