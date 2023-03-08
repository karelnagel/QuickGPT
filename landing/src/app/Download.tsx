"use client";

import { useEffect, useState } from "react";

type Device = "mac" | "windows" | "linux" | "other";
const links: { [key in Device]: string } = {
  mac: "https://github.com/karelnagel/deskgpt/releases/latest/download/Mac.GPT.app.tar.gz",
  windows:
    "https://github.com/karelnagel/deskgpt/releases/latest/download/Mac.GPT_0.0.0_x64_en-US.msi",
  linux:
    "https://github.com/karelnagel/deskgpt/releases/latest/download/deskgpt_0.0.0_amd64.deb",
  other: "https://github.com/karelnagel/deskgpt/releases/latest",
};
export const Download = () => {
  const [device, setDevice] = useState<Device>("other");

  useEffect(() => {
    const ua = window.navigator.userAgent;
    if (ua.includes("Macintosh")) setDevice("mac");
    else if (ua.includes("Windows")) setDevice("windows");
    else if (ua.includes("Linux")) setDevice("linux");
  });

  return (
    <div>
      <div className="dropdown-hover dropdown">
        <label tabIndex={0} className="btn m-1">
          Hover
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
        >
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
