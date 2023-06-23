#!/usr/bin/env node

async function chat(message, callback) {
  const url = new URL("http://localhost:5000/chat");
  url.searchParams.append("message", message);

  const response = await fetch(url);

  let tokens = [];
  for await (const chunk of response.body) {
    const token = new TextDecoder("utf-8").decode(chunk);
    callback(token);
    tokens.push(token);
  }
  return tokens.join("");
}

// We take the prompt from a command line argument
const prompt = process.argv[2];

chat(prompt, (token) => {
  // We write the response tokens to stdout as they come in
  process.stdout.write(token);
});
