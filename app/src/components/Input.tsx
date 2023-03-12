import { useEffect, useState } from "react";
import { useFocus } from "../hooks/useFocus";
import { useGPT } from "../hooks/useGPT";

export const Input = () => {
  const [input, setInput] = useState("");
  const call = useGPT();
  const inputRef = useFocus();
  const submit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setInput("");
    await call(input);
  };

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.style.height = "0px";
    const scrollHeight = inputRef.current.scrollHeight;
    inputRef.current.style.height = Math.min(scrollHeight, 200) + "px";
  }, [input]);

  return (
    <form onSubmit={submit} className=" shrink-0 w-full pt-2 flex space-x-2 items-center">
      <textarea
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
        className="textarea min-h-0 leading-5 resize-none no-scrollbar"
      />
    </form>
  );
};
