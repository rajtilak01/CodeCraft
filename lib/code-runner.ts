import { Language } from "./types";

interface ExecutionResult {
  output: string;
  error?: string;
}

export async function executeCode(code: string, language: Language): Promise<ExecutionResult> {
  try {
    switch (language.name) {
      case "Python":
        return await executePython(code);
      case "JavaScript":
      case "TypeScript":
        return await executeJavaScript(code);
      default:
        return {
          output: "Language execution not supported in the browser environment.",
          error: "This language requires a backend runtime.",
        };
    }
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

async function executePython(code: string): Promise<ExecutionResult> {
  try {
    // Using Pyodide for Python execution
    const pyodide = await loadPyodide();
    await pyodide.loadPackage("micropip");
    const output = await pyodide.runPythonAsync(code);
    return { output: String(output) };
  } catch (error) {
    throw new Error(`Python execution error: ${error}`);
  }
}

function executeJavaScript(code: string): Promise<ExecutionResult> {
  return new Promise((resolve) => {
    let output = "";
    const originalConsole = { ...console };
    
    // Capture console.log output
    console.log = (...args) => {
      output += args.map(arg => String(arg)).join(" ") + "\n";
    };

    try {
      // Execute the code in a try-catch block
      const result = new Function(code)();
      
      // If the code returns a value, add it to the output
      if (result !== undefined) {
        output += String(result);
      }

      resolve({ output: output.trim() });
    } catch (error) {
      resolve({ 
        output: "",
        error: error instanceof Error ? error.message : "An unknown error occurred" 
      });
    } finally {
      // Restore original console
      console.log = originalConsole.log;
    }
  });
}

declare global {
  function loadPyodide(): Promise<any>;
}