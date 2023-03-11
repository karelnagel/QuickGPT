import { Position } from "tauri-plugin-positioner-api";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Tab } from "../components/Tabs";
import { defaultPersons } from "../config";

const defAllPersons = Object.keys(defaultPersons);
const defaultPerson = defAllPersons[0] || "";
export type MessageType = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};
export type Screen = "home" | "settings";
export type Person = {
  id: string;
  name: string;
  image?: string;
  prompt?: string;
  messages: MessageType[];
};
export type Persons = { [id: string]: Person };
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

  personId: string;
  setPersonId: (id: string) => void;
  persons: Persons;
  allPersons: string[];
  nextPerson: () => void;
  prevPerson: () => void;
  addPerson: (person: Person) => void;
  removePerson: (id: string) => void;
  editPerson: (person: Person) => void;
  resetPersons: () => void;

  addMessage: (message: MessageType) => void;
  editMessage: (message: MessageType) => void;
  clearMessages: () => void;

  messagesToSend?: number;
  setMessagesToSend: (num?: number) => void;
};
const tabs: Tab[] = ["chat", "persons", "settings"];
export const useStore = create(
  persist(
    immer<StoreType>((set, get) => ({
      tab: "chat",
      setTab: (tab) => set({ tab }),
      nextTab: () => set((s) => ({ tab: tabs[(tabs.indexOf(s.tab) + 1) % tabs.length] })),
      prevTab: () => set((s) => ({ tab: tabs[(tabs.indexOf(s.tab) - 1 + tabs.length) % tabs.length] })),

      textSize: "text-base",
      setTextSize: (size) => set({ textSize: size }),

      position: Position.TrayCenter,
      setPosition: (position) => set({ position }),

      persons: defaultPersons,
      allPersons: defAllPersons,
      personId: defaultPerson,

      setPersonId: (personId) => set({ personId }),
      addPerson: (person) =>
        set((s) => {
          s.persons[person.id] = person;
          s.allPersons.push(person.id);
          s.personId = person.id;
        }),
      removePerson: (id) =>
        set((s) => {
          delete s.persons[id];
          s.allPersons = s.allPersons.filter((p) => p !== id);
          s.personId = s.allPersons[0] || "";
          if (!s.allPersons.length) s.resetPersons();
        }),
      editPerson: (person) =>
        set((s) => {
          s.persons[person.id] = person;
        }),

      nextPerson: () =>
        set((s) => {
          const index = s.allPersons.indexOf(s.personId);
          s.personId = s.allPersons[(index + 1) % s.allPersons.length] || "";
        }),
      prevPerson: () =>
        set((s) => {
          const index = s.allPersons.indexOf(s.personId);
          s.personId = s.allPersons[(index - 1 + s.allPersons.length) % s.allPersons.length] || "";
        }),
      resetPersons: () =>
        set((s) => {
          s.persons = defaultPersons;
          s.allPersons = defAllPersons;
          s.personId = defaultPerson;
        }),

      shortcut: "CmdOrControl+Shift+G",
      setShortcut: (key) => set({ shortcut: key }),

      apiKey: "",
      setApiKey: (apiKey) => set({ apiKey }),

      addMessage: (message) =>
        set((state) => {
          const person = state.persons[state.personId];
          if (person) person.messages = [...person.messages, message];
        }),
      editMessage: (message) =>
        set((s) => {
          const person = s.persons[s.personId];
          if (person) person.messages = person.messages.map((m) => (m.id === message.id ? message : m));
        }),
      clearMessages: () =>
        set((s) => {
          const person = s.persons[s.personId];
          if (person) person.messages = [];
        }),
      setMessagesToSend: (num) => set({ messagesToSend: num }),
    })),
    {
      name: "quickgpt",
    }
  )
);
export const usePerson = (id?: string) => useStore((s) => s.persons[id || s.personId]);
export const useMessages = (id?: string) => usePerson(id)?.messages || [];
