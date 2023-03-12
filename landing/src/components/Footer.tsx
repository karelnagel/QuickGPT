import Link from "next/link";
import { footer } from "~/config";
import { Download } from "./Download";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <div className="relative flex bg-base-300 p-8">
      <div className="m-auto grid w-full max-w-screen-lg grid-cols-2 gap-6 md:grid-cols-4">
        <div className="col-span-2 flex items-center justify-center md:col-span-1">
          <Logo />
        </div>
        {footer.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center space-y-4 md:items-start"
          >
            <h3 className="text-lg font-bold uppercase">{item.title}</h3>
            <div className="flex h-full flex-col items-center space-y-1 md:items-start">
              {item.links.map((link) => (
                <Link href={link.url} key={link.title}>
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div className="col-span-2 flex w-full items-center justify-center md:col-span-1">
          <Download className="dropdown-top" />
        </div>
      </div>
    </div>
  );
};
