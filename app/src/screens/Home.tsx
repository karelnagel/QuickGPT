import { useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { useFocus } from "../hooks/useFocus";
import { useGPT } from "../hooks/useGPT";
import { MessageType, useStore } from "../hooks/useStore";
import { Markdown } from "../components/Markdown";
import { VscDebugRestart } from "react-icons/vsc";
import { open } from "@tauri-apps/api/shell";
import { PersonalitySelect } from "../components/PersonalitySelect";

const Message = ({ content, role }: MessageType) => {
  return (
    <div className={` p-2 rounded-lg my-1 ${role === "user" ? "text-right bg-primary text-primary-content" : "text-left bg-base-300"}`}>
      {content ? <Markdown>{content}</Markdown> : <div>...</div>}
    </div>
  );
};

export const Home = () => {
  const [input, setInput] = useState("");
  const messages = useStore((s) => s.messages);
  const setScreen = useStore((s) => s.setScreen);
  const clearChat = useStore((s) => s.clearChat);
  const apiKey = useStore((s) => s.apiKey);
  const call = useGPT();
  const inputRef = useFocus();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput("");
    await call(input);
  };

  return (
    <div className="h-screen flex flex-col justify-between w-screen">
      <div className="flex justify-between  p-2 items-center border-b border-base-content">
        <PersonalitySelect/>
        <IoIosSettings className="text-xl cursor-pointer" onClick={() => setScreen("settings")} />
      </div>
      <div className="h-full overflow-auto flex flex-col-reverse px-2">
        {[...messages].reverse().map((m) => (
          <Message key={m.id} {...m} />
        ))}
      </div>
      <form onSubmit={submit} className="w-full p-2 flex space-x-2 items-center">
        <button onClick={clearChat} type="button">
          <VscDebugRestart className="aspect-square h-full shrink-0 w-[20px] text-error" />
        </button>
        <input ref={inputRef} value={input} onChange={(e) => setInput(e.currentTarget.value)} className="input bg-base-300 input-sm" />
        <button type="submit">
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

const SendIcon = () => {
  return (
    <svg height="20px" viewBox="0 0 24 24" width="20px" className="aspect-square h-full shrink-0 text-primary">
      <path
        fill="currentColor"
        d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"
        data-darkreader-inline-fill=""
      ></path>
    </svg>
  );
};
