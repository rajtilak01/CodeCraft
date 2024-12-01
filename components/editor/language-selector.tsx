"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Code2 } from "lucide-react";
import { type Language } from "@/lib/types";
import { LanguageIcon } from "./language-icon";

interface LanguageSelectorProps {
  languages: Language[];
  selectedLanguage: Language;
  onLanguageSelect: (language: Language) => void;
}

export function LanguageSelector({
  languages,
  selectedLanguage,
  onLanguageSelect,
}: LanguageSelectorProps) {
  return (
    <div className="w-16 bg-card border-r border-border flex flex-col items-center py-4 space-y-4">
      <div className="flex flex-col items-center space-y-2">
        <Code2 className="w-6 h-6 text-primary" />
        <Separator className="w-8" />
      </div>
      {languages.map((lang) => (
        <Button
          key={lang.extension}
          variant={selectedLanguage.name === lang.name ? "secondary" : "ghost"}
          size="icon"
          onClick={() => onLanguageSelect(lang)}
          className="relative"
        >
          <LanguageIcon name={lang.iconName} className="w-5 h-5" />
        </Button>
      ))}
    </div>
  );
}