import { useStore } from "../hooks/useStore";

export const Settings = () => {
  const apiKey = useStore((s) => s.apiKey);
  const setApiKey = useStore((s) => s.setApiKey);
  const setScreen = useStore((s) => s.setScreen);
  const prompt = useStore((s) => s.prompt);
  const setPrompt = useStore((s) => s.setPrompt);
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">OpenAI API key</span>
        </label>
        <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="input" />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Start prompt</span>
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="textarea"
          placeholder="Pretend that you are Elon Musk."
        />
      </div>
      <button onClick={() => setScreen("home")} className="btn btn-primary btn-sm">
        Save
      </button>
    </div>
  );
};
