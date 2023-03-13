import { checkUpdate, installUpdate, UpdateManifest } from "@tauri-apps/api/updater";
import { relaunch } from "@tauri-apps/api/process";
import { useEffect, useState } from "react";

export const Update = () => {
  const [manifest, setManifest] = useState<UpdateManifest>();
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    checkUpdate()
      .then(({ shouldUpdate, manifest }) => {
        if (shouldUpdate) setManifest(manifest);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const update = async () => {
    setUpdating(true);
    await installUpdate();
    await relaunch();
    setUpdating(false);
  };

    if (!manifest) return null;
  return (
    <div className="flex py-1 px-2 items-center justify-between">
      <p className="text-sm">New version {manifest?.version} available!</p>
      <div className="space-x-2">
        <button className="btn btn-xs btn-error normal-case" onClick={() => setManifest(undefined)}>
          Ignore
        </button>
        <button className={`btn btn-xs btn-primary normal-case ${updating ? "loading" : ""}`} disabled={updating} onClick={update}>
          Update
        </button>
      </div>
    </div>
  );
};
