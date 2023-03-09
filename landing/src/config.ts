export type Device = "mac" | "windows" | "linux" | "other";

export const release = "https://github.com/karelnagel/deskgpt/releases/latest";
export const github = "https://github.com/karelnagel/deskgpt";

export const links: { [key in Device]: { url: string; title: string } } = {
  mac: {
    url: "https://github.com/karelnagel/deskgpt/releases/latest/download/DeskGPT.dmg",
    title: "Download For Mac",
  },
  windows: {
    url: "https://github.com/karelnagel/deskgpt/releases/latest/download/DeskGPT.msi",
    title: "Download For Windows",
  },
  linux: {
    url: "https://github.com/karelnagel/deskgpt/releases/latest/download/DeskGPT.deb",
    title: "Download For Linux",
  },
  other: {
    url: release,
    title: "View Releases",
  },
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
      { title: "Personalities", url: "/personalities" },
      { title: "Contributing", url: "/contributing" },
    ],
  },
];
