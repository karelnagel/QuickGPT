import { defaultPrompt } from "../config";
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
      {person && (
        <div className="flex justify-between items-center">
          <PersonalitySelect />
          <button className="btn btn-sm btn-error" onClick={() => removePerson(person.id)}>
            Delete
          </button>
        </div>
      )}
      {person && (
        <>
          <input value={person.name} onChange={(e) => setPerson({ ...person, name: e.target.value })} className="input" placeholder="Name" />
          <input value={person.image || ""} onChange={(e) => setPerson({ ...person, image: e.target.value })} className="input" placeholder="Image" />
          <textarea
            value={person.prompt || ""}
            onChange={(e) => setPerson({ ...person, prompt: e.target.value })}
            className="textarea"
            placeholder={defaultPrompt(person.name)}
          />
        </>
      )}
      <div className="flex items-center justify-between">
        <button className="btn btn-sm btn-primary" onClick={() => newPerson({ id: getRandomId(), name: "New Person", prompt: "" })}>
          New Person
        </button>

        <button className="btn btn-sm" onClick={() => resetPersons()}>
          Reset to Default
        </button>
      </div>
    </div>
  );
};
