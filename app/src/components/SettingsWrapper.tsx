import { ReactNode } from "react";

export const SettingsWrapper = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <div className="flex flex-col items-center space-y-2 w-full max-w-xs m-auto px-2 py-3 overflow-auto h-full rounded-lg">
      <p className=" text-xl ">{title}</p>

      {children}
    </div>
  );
};
