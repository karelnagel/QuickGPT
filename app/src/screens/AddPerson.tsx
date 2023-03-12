import { useState } from "react";
import { defaultPrompt } from "../config";
import { getRandomId } from "../helpers";
import { useStore } from "../hooks/useStore";

export const AddPerson = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [prompt, setPrompt] = useState("");

  const addPerson = useStore((s) => s.addPerson);
  const setPersonId = useStore((s) => s.setPersonId);
  return (
    <div className="flex flex-col space-y-2 p-2">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="input" placeholder="Name" />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Image</span>
        </label>
        <input value={image} onChange={(e) => setImage(e.target.value)} className="input" placeholder="Image URL" />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Prompt (if empty then will be based by name)</span>
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="textarea min-h-[200px]"
          placeholder={prompt || defaultPrompt(name)}
        />
      </div>
      <button className="btn btn-sm btn-primary" onClick={() => addPerson({ id: getRandomId(), name, prompt, image, messages: [] })}>
        Save
      </button>
      <button className="btn btn-sm" onClick={() => setPersonId()}>
        Back
      </button>
    </div>
  );
};
