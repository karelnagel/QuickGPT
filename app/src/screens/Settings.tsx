import { isValidKey } from "../helpers";
import { Model, TextSize, useStore } from "../hooks/useStore";

export const Settings = () => {
  const apiKey = useStore((s) => s.apiKey);
  const setApiKey = useStore((s) => s.setApiKey);
  const textSize = useStore((s) => s.textSize);
  const setTextSize = useStore((s) => s.setTextSize);
  const messagesToSend = useStore((s) => s.messagesToSend);
  const setMessagesToSend = useStore((s) => s.setMessagesToSend);
  const stream = useStore((s) => s.stream);
  const setStream = useStore((s) => s.setStream);

  return (
    <div className=" p-3 items-center flex flex-col space-y-3 text-center text-sm border-t">
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center justify-between space-y-1">
          <label className="label-text">History</label>
          <input
            type="number"
            value={messagesToSend === undefined ? "" : messagesToSend}
            onChange={(e) => setMessagesToSend(e.target.value === "" ? undefined : Number(e.target.value))}
            className="input input-sm"
            placeholder="All"
          />
        </div>

        <div className="flex flex-col items-center justify-between space-y-1">
          <label className="label-text">Text</label>
          <select value={textSize} onChange={(e) => setTextSize(e.target.value as TextSize)} className="select select-sm">
            {Object.entries(TextSize).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-center justify-between space-y-1">
          <label className="label-text">Stream</label>
          <input type="checkbox" checked={stream} onChange={(e) => setStream(!stream)} className="toggle" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col items-center justify-between space-y-1">
          <label className="label-text">Model</label>
          <select value={textSize} onChange={(e) => setTextSize(e.target.value as TextSize)} className="select select-sm">
            {Object.entries(Model).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className=" w-full space-y-2">
          <label className="label-text">API key</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="input input-sm input-primary"
            placeholder="sk-..."
          />
          {apiKey && !isValidKey(apiKey) && <span className="label-text-alt text-error">Invalid key</span>}
        </div>
      </div>
    </div>
  );
};
