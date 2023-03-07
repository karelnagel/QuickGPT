import { useEffect, useRef } from "react";

export const useFocus = () => {
  const ref = useRef<HTMLInputElement>(null);
  // useEffect(() => {
  //   window.addEventListener("focus", () => {
  //     ref.current?.focus();
  //   });
  // }, []);
  return ref;
};
