import { useShortcut } from "./hooks/useShortcut";
import { useStore } from "./hooks/useStore";
import { useTheme } from "./hooks/useTheme";
import { useWindowPosition } from "./hooks/useWindowPosition";
import { Home } from "./screens/Home";
import { Settings } from "./screens/Settings";

export default function App() {
  const screen = useStore((s) => s.screen);
  useTheme();
  useShortcut();
  useWindowPosition();
  return (
    <div className="rounded-xl overflow-hidden bg-base-100 h-screen w-screen">
      {screen === "home" && <Home />}
      {screen === "settings" && <Settings />}
    </div>
  );
}
