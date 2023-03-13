import { useState } from "react";
import { defaultPrompt } from "../config";
import { getRandomId } from "../helpers";
import { usePrompts } from "../hooks/usePrompts";
import { useStore } from "../hooks/useStore";

export const AddPerson = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [prompt, setPrompt] = useState("");
  const addPerson = useStore((s) => s.addPerson);
  usePrompts();
  const prompts = useStore((s) => s.prompts);

  return (
    <div className="flex flex-col space-y-1 p-2 overflow-auto">
      {prompts &&
        Object.entries(prompts).map(([id, p]) => (
          <div>
            <p>{id}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {p?.map((person) => (
                <div
                  key={person.id}
                  className=" p-2 bg-base-300 rounded-lg cursor-pointer flex space-x-2 items-center"
                  onClick={() => addPerson({ ...person, messages: [] })}
                >
                  {person.image && <img src={person.image} className="h-6 w-6 rounded-full object-cover" />}
                  <p>{person.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      <div className="divider py-8">or Create New</div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="input input-sm" placeholder="Name" />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Image</span>
        </label>
        <input value={image} onChange={(e) => setImage(e.target.value)} className="input input-sm" placeholder="Image URL" />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Prompt (if empty then will be based by name)</span>
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="textarea textarea-sm min-h-[200px]"
          placeholder={prompt || defaultPrompt(name)}
        />
      </div>
      <button className="btn btn-sm btn-primary" onClick={() => addPerson({ id: getRandomId(), name, prompt, image, messages: [] })}>
        Add
      </button>
    </div>
  );
};
