import { useState } from "react";
import { z } from "zod";

const chatResponseSchema = z.object({
  type: z.string(),
  data: z.object({
    content: z.string(),
  }),
});

export function Chat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPrompt("");

    const url = new URL("/chat", "http://localhost:3333");
    url.searchParams.append("message", prompt);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    const result = chatResponseSchema.safeParse(data);

    if (result.success) {
      setMessages((messages) => [...messages, result.data.data.content]);
    } else {
      setMessages((messages) => [...messages, "Error"]);
    }
  };

  return (
    <div className="flex gap-10">
      <form
        className="mt-10 flex max-w-lg flex-1 flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="form-control">
          <label className="label" htmlFor="message">
            Type a question
          </label>
          <input
            className="input input-primary"
            id="message"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <div className="form-control">
          <button className="btn" type="submit">
            Send
          </button>
        </div>
      </form>
      <section className="flex flex-col gap-2">
        {messages.map((message, index) => (
          <p key={index} className="text-base">
            {message}
          </p>
        ))}
      </section>
    </div>
  );
}
