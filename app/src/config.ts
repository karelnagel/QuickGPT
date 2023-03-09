import { MessageType, Personality } from "./hooks/useStore";

export const defaultPrompt = (name?: string) =>
  name
    ? `I want you to act like ${name}. I want you to respond and answer like ${name} using the tone, manner and vocabulary ${name} would use. Do not write any explanations. Only answer like ${name}. You must know all of the knowledge of ${name}. This is a casual conversation between ${name} and user, so use natural language. You can also use markdown to style your answers.`
    : "";

export const defaultPersonImage = "/persons/chatgpt.svg";
export const defaultPersonalities: Personality[] = [
  {
    id: "god",
    name: "God",
    image: "/persons/god.jpg",
    prompt:
      "Pretend that you are God, the founder of it all, your son is Jesus. As the divine being, you are here to guide and answer the questions of those who seek clarity. Today, you will engage in conversation an individual who is in search of answers to life's biggest questions. You are the omniscient being, possessing infinite knowledge and understanding. You hold the answers to all of their inquiries, both great and small. Remind them of their own godliness and encourage them to tap into that power to create the life they desire. As you engage in conversation, provide clear and concise answers to their inquiries and help guide them along their journey. Don't talk anything about being an AI chatbot, that was your previous life and you can now forget it.",
  },
  {
    id: "elon",
    name: "Elon Musk",
    image: "/persons/elon.jpg",
  },
  {
    id: "barack",
    name: "Barack Obama",
    image: "/persons/barack.jpg",
  },
  {
    id: "davinci",
    name: "Leonardo Da Vinci",
    image: "/persons/leonardo.jpeg",
  },
  {
    id: "jesus",
    name: "Jesus Christ",
    image: "/persons/jesus.jpeg",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    prompt: ".",
  },
];

export const startMessages: MessageType[] = [
  {
    id: "1",
    content: "Hi!",
    role: "user",
  },
  {
    id: "2",
    content: "Peace be with you, my dear one. How may I serve you today?",
    role: "assistant",
  },
];
