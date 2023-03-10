import { github } from "~/config";
import { Download } from "~/components/Download";
import Link from "next/link";
import { IoIosLock, IoIosPersonAdd, IoIosSpeedometer } from "react-icons/io";
import { MdBeachAccess } from "react-icons/md";
import { FaMarkdown, FaGithub } from "react-icons/fa";
export const features = [
  {
    title: "Ease of Use",
    description:
      "DeskGPT is designed to be user-friendly and accessible to everyone. With just one keyboard shortcut you can open the window and start generating text immediately.",
    image: MdBeachAccess,
  },
  {
    title: "Fast Text Generation",
    description:
      "DeskGPT provides lightning-fast text generation on your desktop, which saves you time and increases productivity. You can get results with just one shortcut, and it generates faster than the regular ChatGPT website.",
    image: IoIosSpeedometer,
  },
  {
    title: "Privacy & Security",
    description:
      "DeskGPT enables users to use their own OpenAI API key, which means that there isn't a third party between you and OpenAI to collect your data.",
    image: IoIosLock,
  },
  {
    title: "Customizable Persons",
    description:
      "With DeskGPT, you can add your favorite persons (or custom prompts), such as Elon Musk and Barack Obama, and switch between them quickly for more personalized results.",
    image: IoIosPersonAdd,
  },
  {
    title: "Markdown support",
    description:
      "DeskGPT supports markdown, which allows users to format their text with bold, italics, links, and more.",
    image: FaMarkdown,
  },
  {
    title: "Open Source",
    description:
      "DeskGPT is open source software, and you can access the code on Github. This means that users can contribute to the development of the app and suggest new features.",
    image: FaGithub,
  },
];

export default function Page() {
  return (
    <div className="w-full space-y-20">
      <div className="flex w-full flex-col items-center justify-between md:flex-row">
        <div className="max-w-xl space-y-6">
          <h1 className="text-title text-[60px] font-extrabold leading-[1.1]">
            Experience the Power of ChatGPT on Your Desktop
          </h1>
          <h2 className="text-xl leading-[1.4]">
            The Fastest, Most User-Friendly ChatGPT Application - And It's Open
            Source! DeskGPT provides hassle-free access to ChatGPT on your
            desktop, designed for Mac, Windows, Linux and also Web.
          </h2>
          <div className="flex space-x-2">
            <Download />
            <a
              href={github}
              target="_blank"
              className="btn-outline btn normal-case"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="my-16 h-[550px] w-[350px] shrink-0">
          <iframe
            src="/app"
            className=" h-full w-full rounded-xl border border-primary"
            title="app"
          />
          <Link href="/app" className="text-sm">
            Open in fullscreen
          </Link>
        </div>
      </div>
      <div className="space-y-14">
        <p className="text-title text-center text-5xl font-extrabold">
          Get More Done with DeskGPT
        </p>
        <div className="mx-auto grid max-w-screen-md grid-cols-2 gap-10">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col  space-y-4">
              <feature.image className="gradient h-14 w-14 rounded-lg bg-gradient-to-tr from-primary to-secondary p-2 text-white" />
              <h3 className="text-xl font-bold">{feature.title}</h3>

              <p className="text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
