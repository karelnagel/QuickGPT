import { useStore } from "./useStore";
import z from "zod";
import { getRandomId } from "../helpers";

const Message = z.object({
  content: z.string(),
  role: z.enum(["user", "assistant", "system"]),
});

export const useGPT = () => {
  const apiKey = useStore((s) => s.apiKey);
  const chat = useStore((s) => s.messages);
  const prompt = useStore((s) => s.prompt);
  const addMessage = useStore((s) => s.addMessage);
  const editMessage = useStore((s) => s.editMessage);

  const call = async (message: string) => {
    const id = getRandomId();
    let result = "";
    addMessage({ content: message, role: "user", id: getRandomId() });
    addMessage({ id, role: "assistant", content: "" });
    const messages = [{ role: "system", content: prompt }, ...Message.array().parse(chat), { role: "user", content: message }];

    const url = apiKey ? "https://api.openai.com/v1/chat/completions" : import.meta.env.VITE_API_URL;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        stream: true,
      }),
    });
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
          console.log(result);
          editMessage({ id, role: "assistant", content: result });
        } catch (e) {
          //   console.log(chunk, "error");
        }
      }
    }
  };
  return call;
};
