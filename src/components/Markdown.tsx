import ReactMarkdown from "react-markdown";
import { open } from "@tauri-apps/api/shell";

export const Markdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl"
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
