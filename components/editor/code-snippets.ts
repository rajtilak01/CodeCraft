export const defaultSnippets = {
  Python: `# Python Example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,

  JavaScript: `// JavaScript Example
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`,

  TypeScript: `// TypeScript Example
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`,

  "C++": `// C++ Example
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,

  PHP: `<?php
// PHP Example
function greet($name) {
    return "Hello, " . $name . "!";
}

echo greet("World");
?>`,

  Rust: `// Rust Example
fn main() {
    println!("Hello, World!");
}`,
};