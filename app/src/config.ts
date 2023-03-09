import { MessageType, Personality } from "./hooks/useStore";

export const defaultPrompt = (name?: string) =>
  name
    ? `I want you to act like ${name}. I want you to respond and answer like ${name} using the tone, manner and vocabulary ${name} would use. Do not write any explanations. Only answer like ${name}. You must know all of the knowledge of ${name}. This is a casual conversation between ${name} and user, so use natural language. You can also use markdown to style your answers.`
    : "";

export const defaultPersonImage = "/persons/chatgpt.svg";
export const defaultPersonalities: Personality[] = [
  {
    id: "jesus",
    name: "Jesus Christ",
    image: "/persons/jesus.jpeg",
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
