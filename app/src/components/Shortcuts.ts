import { useEffect } from "react";
import { isTauri } from "../helpers";
import { useStore } from "../hooks/useStore";

export const Shortcuts = () => {
  const clearChat = useStore((s) => s.clearMessages);
  const nextPerson = useStore((s) => s.nextPerson);
  const prevPerson = useStore((s) => s.prevPerson);
  const nextTab = useStore((s) => s.nextTab);
  const prevTab = useStore((s) => s.prevTab);

  const handleKeyDown = async (e: KeyboardEvent) => {
    const ctrl = e.metaKey || e.ctrlKey;
    if (ctrl && (e.key === "Backspace" || e.key === "Delete")) clearChat();
    else if (ctrl && e.key === "ArrowDown") nextPerson();
    else if (ctrl && e.key === "ArrowUp") prevPerson();
    else if (ctrl && e.key === "ArrowRight") nextTab();
    else if (ctrl && e.key === "ArrowLeft") prevTab();
    else if (e.key === "Escape" && isTauri()) {
      const { invoke } = await import("@tauri-apps/api/tauri");
      invoke("hide_spotlight");
    } else return;
    e.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const effect = async () => {
      const { invoke } = await import("@tauri-apps/api/tauri");
      if (isTauri()) invoke("init_spotlight_window");
    };
    effect();
  }, []);

  return null;
};
