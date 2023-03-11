import { MessageType, useMessages, usePrompt } from "../hooks/useStore";
import { Markdown } from "../components/Markdown";
import { Input } from "../components/Input";

const Message = ({ content, role }: MessageType) => {
  return (
    <div className={`p-2 rounded-lg my-1 ${role === "user" ? "text-right bg-primary text-primary-content" : "text-left bg-base-300"}`}>
      {content ? <Markdown>{content}</Markdown> : <div>...</div>}
    </div>
  );
};

export const Home = () => {
  const messages = useMessages();
  const prompt = usePrompt();

  return (
    <div className="h-full flex flex-col justify-between">
      {!!messages.length && (
        <div className="h-full overflow-auto flex flex-col-reverse scroll no-scrollbar">
          {[...messages].reverse().map((m) => (
            <Message key={m.id} {...m} />
          ))}
        </div>
      )}
      {!messages.length && (
        <div className=" h-full flex items-center justify-center">
          <textarea value={prompt} className="textarea mx-[10%] h-[50%] resize-none" readOnly />
        </div>
      )}

      <Input />
    </div>
  );
};
