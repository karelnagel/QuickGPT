"use client";

import { useEffect, useState } from "react";
import { Device, links } from "~/config";
import { IoMdArrowRoundDown } from "react-icons/io";
export const Download = ({ className }: { className?: string }) => {
  const [device, setDevice] = useState<Device>("other");

  useEffect(() => {
    const ua = window.navigator.userAgent;
    if (ua.includes("Macintosh")) setDevice("mac");
    else if (ua.includes("Windows")) setDevice("windows");
    else if (ua.includes("Linux")) setDevice("linux");
  });

  return (
    <div className={`dropdown-hover dropdown ${className}`}>
      <label
        tabIndex={0}
        className="btn-gradient btn flex w-full flex-nowrap space-x-2  normal-case"
      >
        <IoMdArrowRoundDown className="text-3xl" />
        <p className="whitespace-nowrap">{links[device].title}</p>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box w-full bg-base-300 p-2 shadow"
      >
        {Object.entries(links)
          .filter(([key]) => key !== device)
          .map(([key, { url, title }]) => (
            <li key={key}>
              <a target="_blank" download href={url}>
                {title}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};
