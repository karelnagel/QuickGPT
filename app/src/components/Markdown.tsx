import ReactMarkdown from "react-markdown";
import { open } from "@tauri-apps/api/shell";
import { useStore } from "../hooks/useStore";
import { useState } from "react";

import remarkGfm from "remark-gfm";

export const Markdown = ({ children }: { children: string }) => {
  const textSize = useStore((s) => s.textSize);
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className={`prose ${textSize} max-w-full`}
      components={{
        a: ({ href, children, className, style }) => {
          return (
            <button onClick={() => (href ? open(href) : undefined)} className={`underline ${className}`} style={style}>
              {children}
            </button>
          );
        },
        code: ({ children }) => {
          return (
            <code className="group relative w-full overflow-auto">
              <Copy value={children} />
              {children}
            </code>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

const Copy = ({ value }: { value: any }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };
  return (
    <div
      className="absolute top-0 right-0 cursor-pointer bg-primary bg-opacity-80 text-xs rounded-lg opacity-0 group-hover:opacity-100 duration-200 p-1"
      onClick={copy}
    >
      {copied ? "Copied" : "Copy"}
    </div>
  );
};
