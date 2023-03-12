import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="prose mx-auto my-12 w-full max-w-screen-lg px-2">
      {children}
    </div>
  );
}
