import { useEffect } from "react";
import { moveWindow } from "tauri-plugin-positioner-api";
import { isTauri } from "../helpers";
import { useStore } from "./useStore";

export const useWindowPosition = () => {
  const position = useStore((s) => s.position);
  useEffect(() => {
    if (!isTauri()) return;
    moveWindow(position);
  }); // Add array when better solution for clicking on tray icon is found
};
