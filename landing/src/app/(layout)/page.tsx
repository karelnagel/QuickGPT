import { faq, features, github } from "~/config";
import { Download } from "~/components/Download";
import Link from "next/link";
import { Question } from "~/components/Question";

export default function Page() {
  return (
    <div className="w-full">
      <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center justify-between md:flex-row">
        <div className="max-w-xl space-y-6">
          <h1 className="text-title text-[60px] font-bold leading-[1.1]">
            Experience the Power of ChatGPT on Your Desktop
          </h1>
          <h2 className="text-xl leading-[1.4]">
            The Fastest, Most User-Friendly ChatGPT Application - And It's Open
            Source! Designed for Mac, Windows and Linux.
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
        <div className="group my-16 flex h-[550px] w-[350px] shrink-0 flex-col items-end">
          <iframe
            src="/app"
            className=" h-full w-full rounded-xl"
            title="app"
          />
          <Link href="/app" className="invisible text-sm group-hover:visible">
            Open in fullscreen
          </Link>
        </div>
      </div>
      <div className="bg-base-200">
        <div className="mx-auto max-w-screen-lg space-y-20 py-20">
          <div className="space-y-14">
            <p className="text-title text-center text-5xl font-bold">
              Get More Done with QuickGPT
            </p>
            <div className="mx-auto grid max-w-screen-md grid-cols-2 gap-10">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col space-y-4">
                  <feature.image className="gradient h-14 w-14 rounded-lg bg-gradient-to-tr from-primary to-secondary p-2 text-white" />
                  <h3 className="text-xl font-bold">{feature.title}</h3>

                  <p className="text-base">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className=" space-y-14">
            <p className="text-title text-center text-5xl font-bold">
              Frequently Asked Questions
            </p>
            <div className="mx-auto max-w-screen-md space-y-1">
              {faq.map((question, i) => (
                <Question {...question} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
