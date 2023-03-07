import { useState } from "react";
import { useFocus } from "./hooks/useFocus";
import { IoIosSettings } from "react-icons/io";
import { useStore, type MessageType } from "./hooks/useStore";
import { getRandomId } from "./helpers";

const Message = ({ content, role }: MessageType) => {
  return (
    <div>
      <p>{content}</p>
    </div>
  );
};

function App() {
  const [input, setInput] = useState("");
  const messages = useStore((s) => s.messages);
  const addMessage = useStore((s) => s.addMessage);

  const inputRef = useFocus();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMessage({ content: input, role: "user", id: getRandomId() });
    setInput("");
    
  };
  return (
    <div className="h-screen flex flex-col justify-between w-screen">
      <div className="flex justify-between bg-zinc-600 p-2 items-center">
        <p className="font-bold">Mac GPT</p>
        <IoIosSettings className="text-xl" />
      </div>
      <div className="h-full">
        {messages.map((m) => (
          <Message {...m} />
        ))}
      </div>
      <form onSubmit={submit} className="w-full p-2">
        <input ref={inputRef} value={input} onChange={(e) => setInput(e.currentTarget.value)} className="input resize-none h-10 w-full" />
      </form>
    </div>
  );
}

export default App;
