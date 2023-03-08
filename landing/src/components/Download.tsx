"use client";

import { useEffect, useState } from "react";
import { Device, links } from "~/config";

export const Download = ({ className }: { className?: string }) => {
  const [device, setDevice] = useState<Device>("other");

  useEffect(() => {
    const ua = window.navigator.userAgent;
    if (ua.includes("Macintosh")) setDevice("mac");
    else if (ua.includes("Windows")) setDevice("windows");
    else if (ua.includes("Linux")) setDevice("linux");
  });

  return (
    <div className={`dropdown-hover dropdown w-60 ${className}`}>
      <label
        tabIndex={0}
        className="btn-primary btn w-full text-xl normal-case"
      >
        {links[device].title}
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
