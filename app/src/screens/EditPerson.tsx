import { usePerson, usePrompt, useStore } from "../hooks/useStore";

export const EditPerson = () => {
  const person = usePerson();
  const prompt = usePrompt();
  const setPerson = useStore((s) => s.editPerson);
  const removePerson = useStore((s) => s.removePerson);
  const setShowEditPerson = useStore((s) => s.setShowEditPerson);
  const setPersonId = useStore((s) => s.setPersonId);
  if (!person) return null;
  return (
    <div className="flex flex-col space-y-2">
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
          placeholder={prompt}
        />
      </div>
      <button className="btn btn-sm btn-primary" onClick={() => setShowEditPerson()}>
        Save
      </button>
      <button
        className="btn btn-sm btn-error"
        onClick={() => {
          removePerson(person?.id);
          setPersonId();
        }}
      >
        Delete
      </button>
    </div>
  );
};
