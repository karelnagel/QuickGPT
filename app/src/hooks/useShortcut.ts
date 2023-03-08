import { useEffect } from "react";
import { isRegistered, register } from "@tauri-apps/api/globalShortcut";
import { invoke } from "@tauri-apps/api/tauri";
import { useStore } from "./useStore";

export const useShortcut = () => {
  const clearChat = useStore((s) => s.clearChat);
  const nextPerson = useStore((s) => s.nextPerson);
  const prevPerson = useStore((s) => s.prevPerson);
  const handleKeyDown = (e: KeyboardEvent) => {
    const ctrl = e.metaKey || e.ctrlKey;
    if (ctrl && (e.key === "Backspace" || e.key === "Delete")) clearChat();
    if (ctrl && (e.key === "ArrowRight" || e.key === "ArrowDown")) nextPerson();
    if (ctrl && (e.key === "ArrowLeft" || e.key === "ArrowUp")) prevPerson();
  };
  const shortcut = useStore((s) => s.shortcut);
  const set = async () => {
    if (await isRegistered(shortcut)) return;

    await register(shortcut, async () => {
      await invoke("toggle_window");
    });
  };
  useEffect(() => void set(), [shortcut]);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
};
