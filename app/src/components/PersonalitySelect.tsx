import { useStore } from "../hooks/useStore";

export const PersonalitySelect = () => {
  const personalities = useStore((s) => s.personalities);
  const selected = useStore((s) => s.currentPersonality);
  const personality = personalities.find((p) => p.id === selected);
  const setPersonality = useStore((s) => s.setCurrentPersonality);
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-sm btn-primary">
        {personality?.name || "Select personalty"}
      </label>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        {personalities.map((p) => (
          <li key={p.id} onClick={() => setPersonality(p.id)} className="dropdown-item cursor-pointer">
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
