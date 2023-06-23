#!/usr/bin/env node
import { createInterface } from "node:readline/promises";

async function chat(message: string, callback: (token: string) => void) {
  const url = new URL("http://localhost:3333/chat");
  url.searchParams.append("message", message);

  const response = await fetch(url);

  let tokens: string[] = [];
  for await (const chunk of response.body as any) {
    const token = new TextDecoder("utf-8").decode(chunk);
    callback(token);
    tokens.push(token);
  }
  return tokens.join("");
}

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log();
console.log("Welcome to the LangChain chat demo!");
console.log("Type a message and press enter to chat with the AI.");
console.log();

// We read the user input from stdin
readline.on("line", async (line) => {
  await chat(line, (token) => {
    // We write the response tokens to stdout as they come in
    process.stdout.write(token);
  });
});
