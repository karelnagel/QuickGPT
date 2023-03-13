import { useEffect } from "react";
import { getServerUrl } from "../helpers";
import { Prompt, useStore } from "./useStore";

export const usePrompts = () => {
  const setPrompts = useStore((s) => s.setPrompts);
  useEffect(
    () =>
      void fetch(`${getServerUrl()}/prompts`)
        .then((res) => res.json())
        .then((data: Prompt[]) => {
          const prompts = data.reduce((acc, person) => {
            acc[person.type] = acc[person.type] || [];
            acc[person.type].push(person);
            return acc;
          }, {} as Record<string, Prompt[]>);
          setPrompts(prompts);
        }),
    []
  );
};
