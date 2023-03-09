import { ReactNode } from "react";

export const SettingsWrapper = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <div className="w-full py-6 px-2 overflow-auto h-full">
      <div className="flex flex-col space-y-2 w-full max-w-xs m-auto ">
        <p className="text-xl text-center">{title}</p>

        {children}
      </div>
    </div>
  );
};
