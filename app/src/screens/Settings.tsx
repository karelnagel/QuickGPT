import { Position } from "tauri-plugin-positioner-api";
import { SettingsWrapper } from "../components/SettingsWrapper";
import { isValidKey, StringIsNumber } from "../helpers";
import { TextSize, useStore } from "../hooks/useStore";

export const Settings = () => {
  const apiKey = useStore((s) => s.apiKey);
  const shortcut = useStore((s) => s.shortcut);
  const setShortcut = useStore((s) => s.setShortcut);
  const setApiKey = useStore((s) => s.setApiKey);
  const postion = useStore((s) => s.position);
  const setPosition = useStore((s) => s.setPosition);
  const textSize = useStore((s) => s.textSize);
  const setTextSize = useStore((s) => s.setTextSize);
  const messagesToSend = useStore((s) => s.messagesToSend);
  const setMessagesToSend = useStore((s) => s.setMessagesToSend);

  return (
    <SettingsWrapper title="Settings">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">OpenAI API key, if you want to use your own</span>
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
          <span className="label-text">Shortcut to open</span>
        </label>
        <input type="text" value={shortcut} onChange={(e) => setShortcut(e.target.value)} className="input" placeholder="CmdOrControl+Shift+G" />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">How many messages should be sent to ChatGPT (less = cheaper costs, empty will send all)</span>
        </label>
        <input
          type="number"
          value={messagesToSend === undefined ? "" : messagesToSend}
          onChange={(e) => setMessagesToSend(e.target.value === "" ? undefined : Number(e.target.value))}
          className="input"
          placeholder="Will send all messages"
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Message text size</span>
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
          <span className="label-text">Window position</span>
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
    </SettingsWrapper>
  );
};
