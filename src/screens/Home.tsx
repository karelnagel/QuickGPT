import { useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { useFocus } from "../hooks/useFocus";
import { useGPT } from "../hooks/useGPT";
import { MessageType, useStore } from "../hooks/useStore";
import ReactMarkdown from "react-markdown";
const Message = ({ content, role }: MessageType) => {
  return (
    <div className={`prose text-zinc-200 ${role === "user" ? "text-right bg-zinc-600" : "text-left"}`}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};
export const Home = () => {
  const [input, setInput] = useState("");
  const messages = useStore((s) => s.messages);
  const setScreen = useStore((s) => s.setScreen);
  const clearChat = useStore((s) => s.clearChat);
  const call = useGPT();
  const inputRef = useFocus();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput("");
    await call(input);
  };

  return (
    <div className="h-screen flex flex-col justify-between w-screen">
      <div className="flex justify-between bg-zinc-600 p-2 items-center">
        <p className="font-bold">Mac GPT</p>
        <IoIosSettings className="text-xl cursor-pointer" onClick={() => setScreen("settings")} />
      </div>
      <div className="h-full overflow-auto px-2">
        {messages.map((m) => (
          <Message {...m} />
        ))}
      </div>
      <form onSubmit={submit} className="w-full p-2 flex ">
        <button type="button" onClick={clearChat}>
          X
        </button>
        <input ref={inputRef} value={input} onChange={(e) => setInput(e.currentTarget.value)} className="input resize-none h-10 w-full" />
      </form>
    </div>
  );
};
