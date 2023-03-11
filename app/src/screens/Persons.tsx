import { SettingsWrapper } from "../components/SettingsWrapper";
import { defaultPrompt } from "../config";
import { getRandomId } from "../helpers";
import { usePerson, useStore } from "../hooks/useStore";

export const Persons = () => {
  const person = usePerson();
  const setPerson = useStore((s) => s.editPerson);
  const newPerson = useStore((s) => s.addPerson);
  const resetPersons = useStore((s) => s.resetPersons);
  const removePerson = useStore((s) => s.removePerson);
  return (
    <SettingsWrapper title={"Edit Person"}>
      {person && (
        <>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input value={person.name} onChange={(e) => setPerson({ ...person, name: e.target.value })} className="input" placeholder="Name" />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              value={person.image || ""}
              onChange={(e) => setPerson({ ...person, image: e.target.value })}
              className="input"
              placeholder="Image URL"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Prompt (if empty then will be based by name)</span>
            </label>
            <textarea
              value={person.prompt || ""}
              onChange={(e) => setPerson({ ...person, prompt: e.target.value })}
              className="textarea min-h-[200px]"
              placeholder={defaultPrompt(person.name)}
            />
          </div>
          <button className="btn btn-sm btn-error" onClick={() => removePerson(person?.id)}>
            Delete This Person
          </button>
        </>
      )}

      <button className="btn btn-sm btn-primary" onClick={() => newPerson({ id: getRandomId(), name: "New Person", prompt: "", messages: [] })}>
        Add Person
      </button>

      <button className="btn btn-sm" onClick={() => resetPersons()}>
        Reset All to Default
      </button>
    </SettingsWrapper>
  );
};
