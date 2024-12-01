"use client";

import { Button } from "@/components/ui/button";
import { Sun, Moon, Trash2, Play } from "lucide-react";
import { type Language } from "@/lib/types";

interface EditorHeaderProps {
  selectedLanguage: Language;
  theme: string | undefined;
  onThemeToggle: () => void;
  onClear: () => void;
  onRun: () => void;
  isExecuting: boolean;
}

export function EditorHeader({
  selectedLanguage,
  theme,
  onThemeToggle,
  onClear,
  onRun,
  isExecuting,
}: EditorHeaderProps) {
  return (
    <div className="h-14 border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center space-x-2">
        <span className="font-medium">{selectedLanguage.name}</span>
        <span className="text-muted-foreground">({selectedLanguage.extension})</span>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={onThemeToggle}>
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        <Button variant="ghost" size="icon" onClick={onClear}>
          <Trash2 className="h-5 w-5" />
        </Button>
        <Button onClick={onRun} disabled={isExecuting}>
          <Play className="h-4 w-4 mr-2" />
          {isExecuting ? "Running..." : "Run"}
        </Button>
      </div>
    </div>
  );
}