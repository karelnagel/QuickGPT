import { defaultPersonImage } from "../config";
import { useStore } from "../hooks/useStore";

export const PersonalitySelect = () => {
  const personalities = useStore((s) => s.persons);
  const person = useStore((s) => s.persons.find((p) => p.id === s.currentPersonId) || s.persons[0]);
  const setPersonality = useStore((s) => s.setCurrentPersonId);
  return (
    <div className="dropdown">
      <label tabIndex={0} className="flex items-center space-x-2 border-primary border-2 rounded-full pr-2 w-40 cursor-pointer">
        <img src={person?.image || defaultPersonImage} className="h-8 w-8 object-cover rounded-full shrink-0" />
        <p className="w-full text-center whitespace-nowrap overflow-hidden">{person?.name || "Select personalty"}</p>
      </label>
      <ul tabIndex={0} className="dropdown-content bg-base-300 w-full rounded-box overflow-hidden">
        {personalities.map((p) => (
          <li
            key={p.id}
            onClick={() => setPersonality(p.id)}
            className={`dropdown-item cursor-pointer flex items-center border-primary space-x-2 p-2 ${p.id === person.id ? "bg-primary" : ""}`}
          >
            <img src={p.image || defaultPersonImage} alt={p.name} className="h-6 w-6 object-cover rounded-full" />
            <p>{p.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
