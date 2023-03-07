import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MessageType = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};

export type StoreType = {
  apiKey: string;
  setApiKey: (apiKey: string) => void;
  messages: MessageType[];
  addMessage: (message: MessageType) => void;
  editMessage: (message: MessageType) => void;
  clearChat: () => void;
};
export const useStore = create(
  persist<StoreType>(
    (set, get) => ({
      apiKey: "",
      setApiKey: (apiKey) => set({ apiKey }),
      messages: [],
      addMessage: (message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      },
      editMessage: (message) => {
        set((state) => ({
          messages: state.messages.map((m) => (m.id === message.id ? message : m)),
        }));
      },
      clearChat: () => {
        set((state) => ({
          messages: [],
        }));
      },
    }),
    {
      name: "mac-gpt",
    }
  )
);
