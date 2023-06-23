import { OpenAIChat } from "langchain/llms/openai";
import { config } from "dotenv";

config();

const chat = new OpenAIChat({
  temperature: 0.9,
});

console.log("Chatting...");
chat
  .call("Hello, how are you?")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
