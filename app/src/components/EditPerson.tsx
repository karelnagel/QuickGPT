import { getRandomId } from "../helpers";
import { useStore } from "../hooks/useStore";
import { PersonalitySelect } from "./PersonalitySelect";

export const EditPerson = () => {
  const person = useStore((s) => s.persons.find((p) => p.id === s.currentPersonId));
  const setPerson = useStore((s) => s.editPerson);
  const newPerson = useStore((s) => s.addPerson);
  const resetPersons = useStore((s) => s.resetPersons);
  const removePerson = useStore((s) => s.removePerson);
  return (
    <div className="space-y-2">
      <p>Edit personalities</p>
      <PersonalitySelect />
      {person && (
        <>
          <input value={person.name} onChange={(e) => setPerson({ ...person, name: e.target.value })} className="input" placeholder="Name" />
          <input value={person.image || ""} onChange={(e) => setPerson({ ...person, image: e.target.value })} className="input" placeholder="Image" />
          <textarea
            value={person.prompt}
            onChange={(e) => setPerson({ ...person, prompt: e.target.value })}
            className="textarea"
            placeholder="Prompt"
          />
        </>
      )}
      <button className="btn" onClick={() => newPerson({ id: getRandomId(), name: "New Person", prompt: "" })}>
        New
      </button>
      {person && (
        <button className="btn" onClick={() => removePerson(person.id)}>
          Delete
        </button>
      )}
      <button className="btn" onClick={() => resetPersons()}>
        Reset
      </button>
    </div>
  );
};
