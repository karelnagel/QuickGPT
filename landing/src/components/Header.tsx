import { Download } from "./Download";
import { Logo } from "./Logo";

export const Header = () => {
  return (
    <div className="mx-auto flex w-full max-w-screen-lg items-center justify-between py-3">
      <Logo />
      <Download />
    </div>
  );
};
