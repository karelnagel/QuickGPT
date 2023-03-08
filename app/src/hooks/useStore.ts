import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MessageType = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};
export type Screen = "home" | "settings";
export type StoreType = {
  apiKey: string;
  prompt: string;
  shortcut: string;
  setShortcut: (k: string) => void;
  setPrompt: (prompt: string) => void;
  screen: Screen;
  setScreen: (screen: Screen) => void;
  setApiKey: (apiKey: string) => void;
  messages: MessageType[];
  addMessage: (message: MessageType) => void;
  editMessage: (message: MessageType) => void;
  clearChat: () => void;
};
export const useStore = create(
  persist<StoreType>(
    (set, get) => ({
      shortcut: "CmdOrControl+Shift+G",
      setShortcut: (key) => set({ shortcut: key }),
      apiKey: "",
      prompt: "",
      setPrompt: (prompt) => set({ prompt }),
      screen: "home",
      setScreen: (screen) => set({ screen }),
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
      name: "deskgpt",
    }
  )
);
