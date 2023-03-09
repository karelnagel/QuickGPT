import { Position } from "tauri-plugin-positioner-api";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultPersonalities } from "../config";

export type MessageType = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};
export type Screen = "home" | "settings";
export type Personality = {
  id: string;
  name: string;
  image?: string;
  prompt: string;
};

export type StoreType = {
  apiKey: string;
  position: Position;
  setPosition: (position: Position) => void;
  shortcut: string;
  currentPersonality: string;
  setCurrentPersonality: (id: string) => void;
  personalities: Personality[];
  nextPerson: () => void;
  prevPerson: () => void;
  addPersonality: (personality: Personality) => void;
  removePersonality: (id: string) => void;
  editPersonality: (personality: Personality) => void;
  setShortcut: (k: string) => void;
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
      position: Position.TrayCenter,
      setPosition: (position) => set({ position }),
      personalities: defaultPersonalities,
      currentPersonality: "default",
      setCurrentPersonality: (id) => set({ currentPersonality: id }),
      addPersonality: (personality) => {
        set((state) => ({
          personalities: [...state.personalities, personality],
          currentPersonality: personality.id,
        }));
      },
      removePersonality: (id) => {
        set((state) => ({
          personalities: state.personalities.filter((p) => p.id !== id),
          currentPersonality: state.personalities[0].id,
        }));
      },
      editPersonality: (personality) => {
        set((state) => ({
          personalities: state.personalities.map((p) => (p.id === personality.id ? personality : p)),
        }));
      },
      nextPerson: () => {
        const { personalities, currentPersonality } = get();
        const currentIndex = personalities.findIndex((p) => p.id === currentPersonality);
        const nextIndex = (currentIndex + 1) % personalities.length;
        set({ currentPersonality: personalities[nextIndex].id });
      },
      prevPerson: () => {
        const { personalities, currentPersonality } = get();
        const currentIndex = personalities.findIndex((p) => p.id === currentPersonality);
        const nextIndex = (currentIndex - 1 + personalities.length) % personalities.length;
        set({ currentPersonality: personalities[nextIndex].id });
      },
      shortcut: "CmdOrControl+Shift+G",
      setShortcut: (key) => set({ shortcut: key }),
      apiKey: "",
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
