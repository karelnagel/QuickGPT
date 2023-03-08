import { EditPerson } from "../components/EditPerson";
import { PersonalitySelect } from "../components/PersonalitySelect";
import { isValidKey } from "../helpers";
import { useStore } from "../hooks/useStore";

export const Settings = () => {
  const apiKey = useStore((s) => s.apiKey);
  const shortcut = useStore((s) => s.shortcut);
  const setShortcut = useStore((s) => s.setShortcut);
  const setApiKey = useStore((s) => s.setApiKey);
  const setScreen = useStore((s) => s.setScreen);

  return (
    <div className="flex flex-col items-center space-y-2 w-full max-w-xs m-auto">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">OpenAI API key</span>
        </label>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="input"
          placeholder="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"
        />
        {apiKey && !isValidKey(apiKey) && (
          <label className="label">
            <span className="label-text-alt text-error">Invalid key, should start with 'sk-' and be more than 30 chars long</span>
          </label>
        )}
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Shortcut</span>
        </label>
        <input type="text" value={shortcut} onChange={(e) => setShortcut(e.target.value)} className="input" placeholder="CmdOrControl+Shift+G" />
      </div>
      <EditPerson />
      <button onClick={() => setScreen("home")} className="btn btn-primary btn-sm">
        Save
      </button>
    </div>
  );
};
