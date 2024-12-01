"use client";

interface OutputPanelProps {
  output: string;
  error?: string;
}

export function OutputPanel({ output, error }: OutputPanelProps) {
  return (
    <div className="h-full bg-card p-4 font-mono text-sm overflow-auto">
      <h2 className="text-lg font-semibold mb-2">Output</h2>
      {error ? (
        <pre className="whitespace-pre-wrap text-destructive">{error}</pre>
      ) : (
        <pre className="whitespace-pre-wrap">{output}</pre>
      )}
    </div>
  );
}