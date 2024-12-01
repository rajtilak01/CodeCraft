"use client";

import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { useTheme } from "next-themes";
import { LanguageSelector } from "./editor/language-selector";
import { EditorHeader } from "./editor/editor-header";
import { OutputPanel } from "./editor/output-panel";
import { languages } from "@/lib/constants";
import { defaultSnippets } from "./editor/code-snippets";
import { type Language } from "@/lib/types";
import { executeCode } from "@/lib/code-runner";

export function CodeEditor() {
  const { theme, setTheme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const [code, setCode] = useState(defaultSnippets[languages[0].name as keyof typeof defaultSnippets]);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isExecuting, setIsExecuting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    setCode(defaultSnippets[language.name as keyof typeof defaultSnippets]);
    setOutput("");
    setError(undefined);
  };

  const handleRunCode = async () => {
    setIsExecuting(true);
    setError(undefined);
    setOutput("Executing code...");

    try {
      const result = await executeCode(code, selectedLanguage);
      
      if (result.error) {
        setError(result.error);
        setOutput("");
      } else {
        setOutput(result.output);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setOutput("");
    } finally {
      setIsExecuting(false);
    }
  };

  const handleClearCode = () => {
    setCode("");
    setOutput("");
    setError(undefined);
  };

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex h-screen">
      <LanguageSelector
        languages={languages}
        selectedLanguage={selectedLanguage}
        onLanguageSelect={handleLanguageChange}
      />

      <div className="flex-1 flex flex-col">
        <EditorHeader
          selectedLanguage={selectedLanguage}
          theme={theme}
          onThemeToggle={handleThemeToggle}
          onClear={handleClearCode}
          onRun={handleRunCode}
          isExecuting={isExecuting}
        />

        <div className="flex-1 grid grid-cols-2 divide-x divide-border">
          <div className="h-full overflow-auto">
            <CodeMirror
              value={code}
              height="100%"
              theme={theme === "dark" ? githubDark : githubLight}
              extensions={[selectedLanguage.support]}
              onChange={(value) => setCode(value)}
              className="text-sm"
            />
          </div>
          <OutputPanel output={output} error={error} />
        </div>
      </div>
    </div>
  );
}