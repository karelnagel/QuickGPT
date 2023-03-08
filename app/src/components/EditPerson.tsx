import { getRandomId } from "../helpers";
import { useStore } from "../hooks/useStore";
import { PersonalitySelect } from "./PersonalitySelect";

export const EditPerson = () => {
  const person = useStore((s) => s.personalities.find((p) => p.id === s.currentPersonality));
  const setPerson = useStore((s) => s.editPersonality);
  const newPerson = useStore((s) => s.addPersonality);
  return (
    <div className="space-y-2">
      <p>Edit personalities</p>
      <PersonalitySelect />
      {person && (
        <>
          <input value={person.name} onChange={(e) => setPerson({ ...person, name: e.target.value })} className="input" placeholder="Name" />
          <input value={person.image || ""} onChange={(e) => setPerson({ ...person, image: e.target.value })} className="input" placeholder="Image" />
          <input value={person.prompt} onChange={(e) => setPerson({ ...person, prompt: e.target.value })} className="input" placeholder="Prompt" />
        </>
      )}
      <button onClick={() => newPerson({ id: getRandomId(), name: "New Person", prompt: "" })}>New</button>
    </div>
  );
};
