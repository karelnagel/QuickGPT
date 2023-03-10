import Link from "next/link";
import { footer } from "~/config";
import { Download } from "./Download";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <div className="relative  bg-base-300 p-6">
      <div className="m-auto grid max-w-screen-lg grid-cols-4 gap-2">
        <div className="flex items-center">
          <Logo />
        </div>
        {footer.map((item) => (
          <div key={item.title} className="space-y-4">
            <h3 className="text-lg font-bold uppercase">{item.title}</h3>
            <div className="flex h-full flex-col space-y-1">
              {item.links.map((link) => (
                <Link href={link.url} key={link.title}>
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div className="flex items-center">
          <Download className="dropdown-top" />
        </div>
      </div>
    </div>
  );
};
