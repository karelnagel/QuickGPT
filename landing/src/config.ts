import { z } from "zod";
import { IoIosLock, IoIosPersonAdd, IoIosSpeedometer } from "react-icons/io";
import { MdBeachAccess } from "react-icons/md";
import { FaMarkdown, FaGithub } from "react-icons/fa";

export const release = "https://github.com/karelnagel/quickgpt/releases/latest";
export const github = "https://github.com/karelnagel/quickgpt";

export const Device = z.enum(["mac", "windows", "linux", "other"]);
export type Device = z.infer<typeof Device>;
export const devices: {
  [key in Device]: {
    file?: (v: string) => string;
    title: string;
    url?: string;
  };
} = {
  mac: {
    file: (v) => `QuickGPT_${v}_universal.dmg`,
    title: "Download for Mac",
  },
  windows: {
    file: (v) => `QuickGPT_${v}_x64_en-US.msi`,
    title: "Download for Windows",
  },
  linux: {
    file: (v) => `quick-gpt_${v}_amd64.deb`,
    title: "Download for Linux",
  },
  other: { title: "Go To App", url: "/app" },
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

export const features = [
  {
    title: "Ease of Use",
    description:
      "QuickGPT is designed to be user-friendly and accessible to everyone. With just one keyboard shortcut you can open the window and start generating text immediately.",
    image: MdBeachAccess,
  },
  {
    title: "Fast Text Generation",
    description:
      "QuickGPT provides lightning-fast text generation on your desktop, which saves you time and increases productivity. You can get results with just one shortcut, and it generates faster than the regular ChatGPT website.",
    image: IoIosSpeedometer,
  },
  {
    title: "Privacy & Security",
    description:
      "QuickGPT enables users to use their own OpenAI API key, which means that there isn't a third party between you and OpenAI to collect your data.",
    image: IoIosLock,
  },
  {
    title: "Customizable Persons",
    description:
      "With QuickGPT, you can add your favorite persons (or custom prompts), such as Elon Musk and Barack Obama, and switch between them quickly for more personalized results.",
    image: IoIosPersonAdd,
  },
  {
    title: "Markdown support",
    description:
      "QuickGPT supports markdown, which allows users to format their text with bold, italics, links, and more.",
    image: FaMarkdown,
  },
  {
    title: "Open Source",
    description:
      "QuickGPT is open source software, and you can access the code on Github. This means that users can contribute to the development of the app and suggest new features.",
    image: FaGithub,
  },
];
export const faq = [
  {
    question: "What is QuickGPT?",
    answer:
      "ChatGPT is a language model from OpenAI that can generate human-like text based on prompts given to it. QuickGPT is a desktop application that provides access to ChatGPT's text generation capabilities, making it fast and easy to generate text on your desktop with just a few keystrokes.",
  },
  {
    question: "How can I install QuickGPT?",
    answer:
      "To install QuickGPT, simply visit our website at https://quickgpt.xyz and download the appropriate version for your operating system. Once downloaded, simply run the installer and follow the on-screen instructions to set up the application.",
  },
  {
    question: "How much does it cost?",
    answer:
      "For now it is free, but as the project grows, we may need to charge a small fee to cover the costs of using OpenAI's API. But you can always get a free API key from OpenAI, use the app with that key and pay OpenAI for your usage.",
  },
  {
    question: "Can I use my own OpenAI API key with QuickGPT?",
    answer:
      "Yes, you can use your own OpenAI apiKey with QuickGPT to keep your text generation private and secure. Simply enter your apiKey in the settings panel in QuickGPT.",
  },
  {
    question: "What is GIF mode?",
    answer:
      "GIF mode is a feature in QuickGPT that allows you to generate animated GIFs based on your prompts. Simply select the GIF mode option when prompted, and QuickGPT will generate an animated GIF based on your input.",
  },
  {
    question: "Is QuickGPT open source?",
    answer:
      "Yes, QuickGPT is open source and the code is available on GitHub. You can contribute to the project or check out the source code for yourself by visiting our GitHub repository at https://github.com/karelnagel/quickgpt.",
  },
  {
    question: "Who is behind this?",
    answer: "Karel Nagel",
  },
  {
    question: "How do I add my own famous person to QuickGPT?",
    answer:
      "To add your own famous person to QuickGPT, simply type their name into the Name field. QuickGPT will automatically generate text based on that person's style of speech and mannerisms, making it easy to generate text in their voice.",
  },
  {
    question: "How do I add my own custom prompt to QuickGPT?",
    answer:
      "To add your own custom prompt to QuickGPT, simply type your prompt into the Prompt field. Read this blog post about how to write the best prompts for ChatGPT: https://quickgpt.xyz/best-prompts",
  },
];
