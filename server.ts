import * as dotenv from "dotenv";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage } from "langchain/schema";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

const chat = new ChatOpenAI({
  temperature: 0.9,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

app.get("/chat", async (req, res) => {
  const message = req.query.message as string;
  const response = await chat.call([new HumanChatMessage(message)]);
  res.json(response);
});

app.get("*", (req, res) => {
  res.send(`<h1>LangChain</h1>
<form action="/chat" method="GET">
  <input type="text" name="message" />
  <input type="submit" value="Send" />
</form>
  `);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
