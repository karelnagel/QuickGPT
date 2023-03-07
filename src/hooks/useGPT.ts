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
    console.log("calling");
    const id = getRandomId();
    addMessage({ content: message, role: "user", id: getRandomId() });
    addMessage({ id, role: "assistant", content: "Thinking..." });
    const messages = [{ role: "system", content: prompt }, ...Message.array().parse(chat), { role: "user", content: message }];
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        stream: false,
      }),
    });

    const data = await res.json();
    editMessage({ id, role: "assistant", content: data.choices[0].message.content });
    console.log(data);
  };
  return call;
};
