import { useIsClient } from "./hooks/useIsClient";
import { Shortcuts } from "./components/Shortcuts";
import { Home } from "./screens/Home";
import { Notification } from "./components/Notification";

export default function App() {
  const isCLient = useIsClient();

  if (!isCLient) return <div>Loading...</div>;
  return (
    <>
      <Home />
      <Notification />
      <Shortcuts />
    </>
  );
}
