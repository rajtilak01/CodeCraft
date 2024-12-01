"use client";

import {
  Code as PythonIcon,
  FileJson,
  Database,
  Cpu,
  Coffee,
  Cog,
} from "lucide-react";

interface LanguageIconProps {
  name: string;
  className?: string;
}

export function LanguageIcon({ name, className }: LanguageIconProps) {
  const icons = {
    Python: PythonIcon,
    JavaScript: FileJson,
    TypeScript: Database,
  };

  const Icon = icons[name as keyof typeof icons];
  return Icon ? <Icon className={className} /> : null;
}