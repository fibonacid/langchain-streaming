import { useState } from "react";
import Markdown from "react-markdown";

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

    const reader = response.body?.getReader();
    if (!reader) return;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const text = new TextDecoder("utf-8").decode(value);
      console.log(text);
      setMessages((messages) => [...messages, text]);
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
      <section className="flex flex-1 flex-col gap-2">
        <Markdown>{messages.join(" ")}</Markdown>
      </section>
    </div>
  );
}
