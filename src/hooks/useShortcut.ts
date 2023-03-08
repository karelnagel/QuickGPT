import { useEffect } from "react";
import { isRegistered, register } from "@tauri-apps/api/globalShortcut";
import { invoke } from "@tauri-apps/api/tauri";
import { useStore } from "./useStore";

export const useShortcut = () => {
  const clearChat = useStore((s) => s.clearChat);
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === "Backspace" || e.key === "Delete")) clearChat();
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
