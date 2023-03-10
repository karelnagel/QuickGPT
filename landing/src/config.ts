import { z } from "zod";

export const release = "https://github.com/karelnagel/deskgpt/releases/latest";
export const github = "https://github.com/karelnagel/deskgpt";

export const Device = z.enum(["mac", "windows", "linux", "other"]);
export type Device = z.infer<typeof Device>;
export const devices: {
  [key in Device]: { file?: (v: string) => string; title: string };
} = {
  mac: { file: (v) => `DeskGPT_${v}_universal.dmg`, title: "Download for Mac" },
  windows: {
    file: (v) => `DeskGPT_${v}_x64_en-US.msi`,
    title: "Download for Windows",
  },
  linux: {
    file: (v) => `desk-gpt_${v}_amd64.deb`,
    title: "Download for Linux",
  },
  other: { title: "Get S" },
};
export const footer = [
  {
    title: "Links",
    links: [
      { title: "GitHub", url: github },
      { title: "Latest release", url: release },
      { title: "Twitter", url: "https://twitter.com/karelETH" },
      { title: "Linkedin", url: "https://linkedin.com/in/karelnagel" },
    ],
  },
  {
    title: "About",
    links: [
      { title: "How to install", url: "/how-to-install" },
      { title: "Best Prompts", url: "/best-prompts" },
      { title: "Persons", url: "/persons" },
      { title: "Contributing", url: "/contributing" },
    ],
  },
];
