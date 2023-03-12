import { useEffect, useRef } from "react";
import { useStore } from "./useStore";

export const useFocus = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const personId = useStore((s) => s.personId);
  const focus = () => ref.current?.focus();
  useEffect(() => window.addEventListener("focus", focus), []);
  useEffect(focus, [personId]);
  return ref;
};
