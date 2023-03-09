import { useEffect } from "react";
import { isTauri } from "../helpers";

export const useTheme = () => {
  useEffect(() => {
    if (!isTauri()) return;
    const run = async () => {
      const { appWindow } = await import("@tauri-apps/api/window");
      appWindow.theme().then((theme) => {
        if (theme) document.querySelector("html")?.setAttribute("data-theme", theme);
      });
      appWindow.onThemeChanged((theme) => {
        if (theme.payload) document.querySelector("html")?.setAttribute("data-theme", theme.payload);
      });
    };
    run();
  }, []);
};
