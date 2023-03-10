import { Tabs } from "./components/Tabs";
import { useIsClient } from "./hooks/useIsClient";
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
  const isCLient = useIsClient();
  if (!isCLient) return <div>Loading...</div>;
  return (
    <div className="rounded-xl overflow-hidden bg-base-100 h-screen w-screen flex flex-col p-2 ">
      <Tabs />
      <div className=" h-full w-full overflow-hidden">
        {tab === "chat" && <Home />}
        {tab === "persons" && <Persons />}
        {tab === "settings" && <Settings />}
      </div>
    </div>
  );
}
