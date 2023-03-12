import { Download } from "./Download";
import { Logo } from "./Logo";

export const Header = () => {
  return (
    <div className="relative mx-auto flex w-full max-w-screen-lg items-center justify-between py-3 px-2 md:px-0">
      <Logo className="text-white" />
      <Download />
    </div>
  );
};
