import { useEffect, useRef } from "react";
import { useStore } from "./useStore";

export const useFocus = () => {
  const ref = useRef<HTMLInputElement>(null);
  const personId = useStore((s) => s.personId);
  const tab = useStore((s) => s.tab);
  const focus = () => ref.current?.focus();
  useEffect(() => window.addEventListener("focus", focus), []);
  useEffect(focus, [personId, tab]);
  return ref;
};
