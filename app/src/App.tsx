import { Tabs } from "./components/Tabs";
import { useShortcut } from "./hooks/useShortcut";
import { useStore } from "./hooks/useStore";
import { useTheme } from "./hooks/useTheme";
import { useWindowPosition } from "./hooks/useWindowPosition";
import { Home } from "./screens/Home";
import { Persons } from "./screens/Persons";
import { Settings } from "./screens/Settings";

export default function App() {
  const tab = useStore((s) => s.tab);
  useTheme();
  useShortcut();
  useWindowPosition();
  return (
    <div className="rounded-xl overflow-hidden bg-base-100 h-screen w-screen flex flex-col">
      <Tabs />
      <div className=" h-full w-full overflow-hidden">
        {tab === "chat" && <Home />}
        {tab === "persons" && <Persons />}
        {tab === "settings" && <Settings />}
      </div>
    </div>
  );
}
