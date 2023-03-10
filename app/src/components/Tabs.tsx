import { defaultPersonImage } from "../config";
import { useStore } from "../hooks/useStore";

export type Tab = "chat" | "persons" | "settings";

export const Tabs = () => {
  const persons = useStore((s) => s.persons);
  const person = useStore((s) => s.persons.find((p) => p.id === s.currentPersonId) || s.persons[0]);
  const setPersonality = useStore((s) => s.setCurrentPersonId);
  const tab = useStore((s) => s.tab);
  const setTab = useStore((s) => s.setTab);
  const activeTab = "bg-gradient-to-r from-primary to-secondary text-white";
  return (
    <div className="tabs tabs-boxed w-full grid grid-cols-3 shrink-0">
      <div className={`tab p-0 w-full cursor-pointer ${tab === "chat" ? activeTab : "hover:bg-base-100"}`}>
        <div className="dropdown dropdown-hover w-full ">
          <label tabIndex={0} onClick={() => setTab("chat")} className="flex items-center space-x-2 cursor-pointer w-full px-2">
            {person && <img src={person.image || defaultPersonImage} className="h-6 aspect-square object-cover rounded-full shrink-0" />}
            <p className=" whitespace-nowrap overflow-hidden">{person?.id ? person?.name : "No Persons"}</p>
          </label>
          <ul tabIndex={0} className="dropdown-content rounded-lg overflow-hidden w-full bg-base-300 text-base-content">
            {persons.map((p) => (
              <li
                key={p.id}
                onClick={() => setPersonality(p.id)}
                className={`cursor-pointer flex items-center space-x-1 px-1 py-1 ${
                  p.id === person?.id ? "bg-primary" : "hover:bg-primary hover:bg-opacity-40"
                }`}
              >
                <img src={p.image || defaultPersonImage} alt={p.name} className="h-6 w-6 object-cover rounded-full" />
                <p className="whitespace-nowrap overflow-hidden">{p.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div onClick={() => setTab("persons")} className={`tab w-full cursor-pointer ${tab === "persons" ? activeTab: "hover:bg-base-100"}`}>
        Edit
      </div>
      <div onClick={() => setTab("settings")} className={`tab w-full cursor-pointer ${tab === "settings" ? activeTab : "hover:bg-base-100"}`}>
        Settings
      </div>
    </div>
  );
};
