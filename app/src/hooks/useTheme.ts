import { appWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";

export const useTheme = () => {
  useEffect(() => {
    appWindow.theme().then((theme) => {
      if (theme) document.querySelector("html")?.setAttribute("data-theme", theme);
    });
    appWindow.onThemeChanged((theme) => {
      if (theme.payload) document.querySelector("html")?.setAttribute("data-theme", theme.payload);
    });
  }, []);
};
