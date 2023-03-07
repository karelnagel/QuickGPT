import { useStore } from "../hooks/useStore";

export const Settings = () => {
  const apiKey = useStore((s) => s.apiKey);
  const setApiKey = useStore((s) => s.setApiKey);
  const setScreen = useStore((s) => s.setScreen);
  const prompt = useStore((s) => s.prompt);
  const setPrompt = useStore((s) => s.setPrompt);
  return (
    <div className="flex flex-col items-center ">
      <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="input" />
      <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="input" />
      <button onClick={() => setScreen("home")}>Back</button>
    </div>
  );
};
