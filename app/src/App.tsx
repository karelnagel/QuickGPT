import { useIsClient } from "./hooks/useIsClient";
import { Shortcuts } from "./components/Shortcuts";
import { Home } from "./screens/Home";
import { Notification } from "./components/Notification";
import { Update } from "./components/Update";

export default function App() {
  const isCLient = useIsClient();

  if (!isCLient) return <div>Loading...</div>;
  return (
    <>
      <Update />
      <Notification />
      <Home />
      <Shortcuts />
    </>
  );
}
