import { useCallback, useState } from "react";

function ChatBot() {
  const [prompt, setPrompt] = useState("");
  const [lastMessage, setLastMessage] = useState("");

  const handleSubmit = useCallback(async () => {
    setPrompt("");
    setLastMessage("");
    const url = new URL("/chat", "http://localhost:3333");
    url.searchParams.append("message", prompt);
    const response = await fetch(url);

    for await (const chunk of response.body as any) {
      const text = new TextDecoder("utf-8").decode(chunk);
      setLastMessage((prevText) => prevText + text);
    }
  }, [setLastMessage, setPrompt, prompt]);

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Type a question</label>
        <input
          id="message"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <p>{lastMessage}</p>
    </section>
  );
}

function App() {
  return (
    <main className="m-8">
      <h1 className="mb-2 text-lg font-bold">LangChain Streaming</h1>
      <p className="text-sm">
        This is a demo of the LangChain streaming feature.
      </p>
      <ChatBot />
    </main>
  );
}

export default App;
