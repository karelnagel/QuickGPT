import { Position } from "tauri-plugin-positioner-api";
import { EditPerson } from "../components/EditPerson";
import { isValidKey, StringIsNumber } from "../helpers";
import { TextSize, useStore } from "../hooks/useStore";

export const Settings = () => {
  const apiKey = useStore((s) => s.apiKey);
  const shortcut = useStore((s) => s.shortcut);
  const setShortcut = useStore((s) => s.setShortcut);
  const setApiKey = useStore((s) => s.setApiKey);
  const setScreen = useStore((s) => s.setScreen);
  const postion = useStore((s) => s.position);
  const setPosition = useStore((s) => s.setPosition);
  const textSize = useStore((s) => s.textSize);
  const setTextSize = useStore((s) => s.setTextSize);

  return (
    <div className="flex flex-col items-center space-y-2 w-full max-w-xs m-auto px-2 overflow-auto h-full rounded-lg">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">OpenAI API key</span>
        </label>
        <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="input" placeholder="sk-..." />
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
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Text Size</span>
        </label>
        <select value={textSize} onChange={(e) => setTextSize(e.target.value as TextSize)} className="select">
          {Object.entries(TextSize).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Postition</span>
        </label>
        <select value={postion} onChange={(e) => setPosition(Number(e.target.value))} className="select">
          {Object.entries(Position)
            .filter(([key]) => StringIsNumber(key))
            .map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
        </select>
      </div>
      <EditPerson />
      <button onClick={() => setScreen("home")} className="btn btn-primary btn-sm">
        Save
      </button>
    </div>
  );
};
