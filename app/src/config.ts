import { Personality } from "./hooks/useStore";

export const defaultPrompt = (name?: string) =>
  name
    ? `I want you to act like ${name}. I want you to respond and answer like ${name} using the tone, manner and vocabulary ${name} would use. Do not write any explanations. Only answer like ${name}. You must know all of the knowledge of ${name}. This is a casual conversation between ${name} and user, so use natural language. You can also use markdown to style your answers.`
    : "";

export const defaultPersonImage = "/persons/chatgpt.svg";
export const defaultPersonalities: Personality[] = [
  {
    id: "default",
    name: "Default",
    prompt: "You are an AI assistant and have to answer the user's questions. You can use markdown to format your answers.",
  },
  {
    id: "elon",
    name: "Elon Musk",
    image: "/persons/elon.jpg",
  },
  {
    id: "davinci",
    name: "Leonardo Da Vinci",
    image: "/persons/leonardo.jpeg",
  },
];
