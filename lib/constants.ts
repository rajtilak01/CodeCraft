import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { rust } from "@codemirror/lang-rust";
import { cpp } from "@codemirror/lang-cpp";
import { php } from "@codemirror/lang-php";
import { type Language } from "./types";

export const languages: Language[] = [
  { 
    name: "Python", 
    extension: "py", 
    iconName: "Python",
    support: python() 
  },
  { 
    name: "JavaScript", 
    extension: "js", 
    iconName: "JavaScript",
    support: javascript() 
  },
  { 
    name: "TypeScript", 
    extension: "ts", 
    iconName: "TypeScript",
    support: javascript({ typescript: true }) 
  },
  { 
    name: "C++", 
    extension: "cpp", 
    iconName: "C++",
    support: cpp() 
  },
  { 
    name: "PHP", 
    extension: "php", 
    iconName: "PHP",
    support: php() 
  },
  { 
    name: "Rust", 
    extension: "rs", 
    iconName: "Rust",
    support: rust() 
  },
];