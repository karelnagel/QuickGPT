import { MessageType, useMessages, usePrompt, useStore } from "./useStore";
import z from "zod";
import { getRandomId, getServerUrl } from "../helpers";

const Message = z.object({
  content: z.string(),
  role: z.enum(["user", "assistant", "system"]),
});

export const useGPT = () => {
  const apiKey = useStore((s) => s.apiKey);
  const chat = useMessages();
  const addMessage = useStore((s) => s.addMessage);
  const editMessage = useStore((s) => s.editMessage);
  const messagesToSend = useStore((s) => s.messagesToSend);
  const prompt = usePrompt();
  const stream = useStore((s) => s.stream);
  const model = useStore((s) => s.model);

  const call = async (message: string) => {
    const id = getRandomId();
    let result = "";
    addMessage({ content: message, role: "user", id: getRandomId() });
    addMessage({ id, role: "assistant", content: "" });
    const messages: Partial<MessageType>[] = [
      { role: "system", content: prompt },
      ...Message.array().parse([...chat].splice(-(messagesToSend || 0))), // if ===0, its wrong
      { role: "user", content: message },
    ];

    const url = apiKey ? "https://api.openai.com/v1/chat/completions" : `${getServerUrl()}/gpt`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream,
      }),
    });
    try {
      if (!stream) {
        const result = await res.json();
        const content = result.choices[0].message.content;
        editMessage({ id, role: "assistant", content });
      } else {
        const reader = res.body?.getReader();
        if (!reader) return;

        const decoder = new TextDecoder();

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunkValue = decoder.decode(value);
          const chunks = chunkValue.replaceAll("data:", "").split("\n");
          for (const chunk of chunks) {
            try {
              const json = JSON.parse(chunk);
              const res = json.choices[0].delta?.content || "";
              result += res;
              editMessage({ id, role: "assistant", content: result });
            } catch (e) {}
          }
        }
      }
    } catch (e) {
      alert("Error with generating text");
      console.log(e);
    }
  };
  return call;
};
