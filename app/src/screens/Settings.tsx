import { isValidKey } from "../helpers";
import { TextSize, useStore } from "../hooks/useStore";

export const Settings = () => {
  const apiKey = useStore((s) => s.apiKey);
  const setApiKey = useStore((s) => s.setApiKey);
  const textSize = useStore((s) => s.textSize);
  const setTextSize = useStore((s) => s.setTextSize);
  const messagesToSend = useStore((s) => s.messagesToSend);
  const setMessagesToSend = useStore((s) => s.setMessagesToSend);
  const sizes = Object.entries(TextSize);
  return (
    <div className=" p-3 items-center flex flex-col space-y-3 text-center text-sm border-t">
      <div className="w-full space-y-2">
        <p>History to send</p>
        <div className="grid grid-cols-5 w-full space-x-3">
          <input
            type="range"
            min={0}
            step={1}
            max={100}
            value={messagesToSend === undefined ? 100 : messagesToSend}
            onChange={(e) => setMessagesToSend(e.target.value === "100" ? undefined : Number(e.target.value))}
            className="range range-sm range-primary col-span-4"
          />
          <p>{messagesToSend === undefined ? "All" : messagesToSend === 0 ? "None" : messagesToSend}</p>
        </div>
      </div>
      <div className="w-full space-y-2">
        <p>Text Size</p>
        <div className="grid grid-cols-5 w-full space-x-3">
          <input
            type="range"
            min={0}
            step={1}
            max={sizes.length - 1}
            className="range range-sm range-primary col-span-4"
            value={sizes.findIndex((s) => s[0] === textSize)}
            onChange={(e) => setTextSize(sizes[Number(e.target.value) || 0]?.[0] as TextSize)}
          />
          <p>{TextSize[textSize]}</p>
        </div>
      </div>
      <div className=" w-full space-y-2">
        <p>OpenAI API key</p>
        <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="input input-sm input-primary" placeholder="sk-..." />
        {apiKey && !isValidKey(apiKey) && <span className="label-text-alt text-error">Invalid key</span>}
      </div>
    </div>
  );
};
