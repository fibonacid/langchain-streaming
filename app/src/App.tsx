import { Chat } from "./Chat";

function App() {
  return (
    <main className="m-8">
      <h1 className="mb-2 text-lg font-bold">LangChain Streaming</h1>
      <p className="text-sm">
        This is a demo of the LangChain streaming feature.
      </p>
      <Chat />
    </main>
  );
}

export default App;
