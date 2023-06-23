import * as dotenv from "dotenv";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage } from "langchain/schema";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));

const chat = new ChatOpenAI({
  temperature: 0.9,
  openAIApiKey: process.env.OPENAI_API_KEY,
  // streaming: true,
  callbacks: [
    {
      handleLLMNewToken(token: string) {
        console.log("New token:", token);
      },
    },
  ],
});

app.get("/chat", async (req, res) => {
  const message = req.query.message;
  if (typeof message === "string" && message) {
    const response = await chat.call([new HumanChatMessage(message)]);
    res.json(response);
  } else {
    res.json({ error: "No message provided" });
  }
});

app.get("/", (req, res) => {
  res.redirect("http://localhost:3000");
});

app.listen(3333, () => {
  console.log("Server running on http://localhost:3333");
});
