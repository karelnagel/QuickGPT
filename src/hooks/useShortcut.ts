import { useEffect } from "react";
import { isRegistered, register } from "@tauri-apps/api/globalShortcut";
import { invoke } from "@tauri-apps/api/tauri";

const shortcut = "CmdOrControl+Shift+G";

const set = async () => {
  if (await isRegistered(shortcut)) return;

  await register(shortcut, async () => {
    await invoke("toggle_window");
  });
};

export const useShortcut = () => {
  useEffect(() => void set(), []);
};
