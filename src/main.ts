// Example TypeScript file with various issues and security vulnerabilities for SonarCloud testing

import * as fs from 'fs';
import * as express from 'express';
const app = express();

// Unused variable
let unusedVariable = 123;

// Function with too many parameters
function tooManyParameters(a, b, c, d, e, f, g) {
  console.log(a + b + c + d + e + f + g);
}

// Function with implicit any types
function add(a, b) {
  return a + b;
}

// Unused function
function unusedFunction() {
  console.log("This function is never called");
}

// Incorrect equality check
if (1 == "1") {
  console.log("Incorrect equality check");
}

// Console logging (considered bad practice in production code)
console.log("This is a console log statement");

// Null and undefined mix-up
let potentiallyNull: string | null = null;
if (potentiallyNull === undefined) {
  console.log("This is a mix-up between null and undefined");
}

// Infinite loop
while (true) {
  // Intentional infinite loop
}

// Redefining a variable (bad practice)
var redefinedVariable = "initial value";
var redefinedVariable = "new value";

// Implicit any in array
let mixedArray = [1, "two", true];

// Security Vulnerability: Cross-Site Scripting (XSS)
app.get('/xss', (req, res) => {
  // User input should not be directly rendered without sanitization
  res.send(req.query.userInput);
});

// Security Vulnerability: Path Traversal
app.get('/file', (req, res) => {
  // This could allow an attacker to read any file on the server
  let filePath = req.query.filePath;
  res.sendFile(filePath.toString());
});

// Security Vulnerability: Command Injection
app.get('/exec', (req, res) => {
  // Executing user input without validation can lead to command injection
  let userCommand = req.query.command;
  require('child_process').exec(userCommand, (error, stdout, stderr) => {
    res.send(stdout);
  });
});

// Export something to avoid TS error for no exported members
export { tooManyParameters, add };
