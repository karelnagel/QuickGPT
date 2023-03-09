import ReactMarkdown from "react-markdown";
import { open } from "@tauri-apps/api/shell";
import { useStore } from "../hooks/useStore";

export const Markdown = ({ children }: { children: string }) => {
  const textSize = useStore((s) => s.textSize);
  return (
    <ReactMarkdown
      className={`prose ${textSize} max-w-full`}
      components={{
        a: ({ href, children, className, style }) => {
          return (
            <button onClick={() => (href ? open(href) : undefined)} className={`text-primary ${className}`} style={style}>
              {children}
            </button>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
