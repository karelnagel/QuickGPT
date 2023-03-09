import { useEffect } from "react";
import { isRegistered, register } from "@tauri-apps/api/globalShortcut";
import { invoke } from "@tauri-apps/api/tauri";
import { useStore } from "./useStore";
import { isTauri } from "../helpers";

export const useShortcut = () => {
  const clearChat = useStore((s) => s.clearMessages);
  const nextPerson = useStore((s) => s.nextPerson);
  const prevPerson = useStore((s) => s.prevPerson);
  const nextTab = useStore((s) => s.nextTab);
  const prevTab = useStore((s) => s.prevTab);
  const handleKeyDown = (e: KeyboardEvent) => {
    const ctrl = e.metaKey || e.ctrlKey;
    if (ctrl && (e.key === "Backspace" || e.key === "Delete")) clearChat();
    if (ctrl && e.key === "ArrowDown") nextPerson();
    if (ctrl && e.key === "ArrowUp") prevPerson();
    if (ctrl && e.key === "ArrowRight") nextTab();
    if (ctrl && e.key === "ArrowLeft") prevTab();
  };
  const shortcut = useStore((s) => s.shortcut);

  useEffect(() => {
    const set = async () => {
      if (!isTauri()) return;
      if (await isRegistered(shortcut)) return;

      await register(shortcut, async () => {
        await invoke("toggle_window");
      });
    };
    set();
  }, [shortcut]);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
};
