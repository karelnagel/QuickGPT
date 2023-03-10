import { Position } from "tauri-plugin-positioner-api";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Tab } from "../components/Tabs";
import { defaultPersonalities, startMessages } from "../config";

const defaultPerson = (defaultPersonalities as any)[0].id;
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
  prompt?: string;
};
export const TextSize = {
  "text-xs": "XS",
  "text-sm": "S",
  "text-base": "M",
  "text-lg": "L",
  "text-xl": "XL",
  "text-2xl": "2XL",
  "text-3xl": "3XL",
};
export type TextSize = keyof typeof TextSize;

export type StoreType = {
  tab: Tab;
  setTab: (tab: Tab) => void;
  nextTab: () => void;
  prevTab: () => void;

  textSize: TextSize;
  setTextSize: (size: TextSize) => void;

  apiKey: string;
  setApiKey: (apiKey: string) => void;

  position: Position;
  setPosition: (position: Position) => void;

  shortcut: string;
  setShortcut: (k: string) => void;

  currentPersonId: string;
  setCurrentPersonId: (id: string) => void;
  persons: Personality[];
  nextPerson: () => void;
  prevPerson: () => void;
  addPerson: (personality: Personality) => void;
  removePerson: (id: string) => void;
  editPerson: (personality: Personality) => void;
  resetPersons: () => void;

  messages: MessageType[];
  addMessage: (message: MessageType) => void;
  editMessage: (message: MessageType) => void;
  clearMessages: () => void;
};
const tabs: Tab[] = ["chat", "persons", "settings"];
export const useStore = create(
  persist<StoreType>(
    (set, get) => ({
      tab: "chat",
      setTab: (tab) => set({ tab }),
      nextTab: () => {
        set((s) => ({ tab: tabs[(tabs.indexOf(s.tab) + 1) % tabs.length] }));
      },
      prevTab: () => {
        set((s) => ({ tab: tabs[(tabs.indexOf(s.tab) - 1 + tabs.length) % tabs.length] }));
      },

      textSize: "text-base",
      setTextSize: (size) => set({ textSize: size }),

      position: Position.TrayCenter,
      setPosition: (position) => set({ position }),

      persons: defaultPersonalities,
      currentPersonId: defaultPerson,
      setCurrentPersonId: (id) => set({ currentPersonId: id }),
      addPerson: (personality) => {
        set((state) => ({
          persons: [...state.persons, personality],
          currentPersonId: personality.id,
        }));
      },
      removePerson: (id) => {
        set((state) => {
          let persons = state.persons.filter((p) => p.id !== id);
          if (persons.length === 0) persons = defaultPersonalities;
          return {
            persons: persons,
            currentPersonId: persons[0]?.id,
          };
        });
      },
      editPerson: (personality) => {
        set((state) => ({
          persons: state.persons.map((p) => (p.id === personality.id ? personality : p)),
        }));
      },
      nextPerson: () => {
        const { persons: personalities, currentPersonId: currentPersonality } = get();
        const currentIndex = personalities.findIndex((p) => p.id === currentPersonality);
        const nextIndex = (currentIndex + 1) % personalities.length;
        set({ currentPersonId: (personalities as any)[nextIndex].id });
      },
      prevPerson: () => {
        const { persons: personalities, currentPersonId: currentPersonality } = get();
        const currentIndex = personalities.findIndex((p) => p.id === currentPersonality);
        const nextIndex = (currentIndex - 1 + personalities.length) % personalities.length;
        set({ currentPersonId: (personalities as any)[nextIndex].id });
      },
      resetPersons: () => {
        set({ persons: defaultPersonalities, currentPersonId: defaultPerson });
      },

      shortcut: "CmdOrControl+Shift+G",
      setShortcut: (key) => set({ shortcut: key }),

      apiKey: "",
      setApiKey: (apiKey) => set({ apiKey }),

      messages: startMessages,
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
      clearMessages: () => {
        set((state) => ({
          messages: [],
        }));
      },
    }),
    {
      name: "quickgpt",
    }
  )
);
