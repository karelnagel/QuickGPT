import { useEffect } from "react";
import { moveWindow } from "tauri-plugin-positioner-api";
import { useStore } from "./useStore";

export const useWindowPosition = () => {
  const position = useStore((s) => s.position);
  useEffect(() => {
    moveWindow(position);
  }); // Add array when better solution for clicking on tray icon is found
};
