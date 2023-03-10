import { faq, features, github } from "~/config";
import { Download } from "~/components/Download";
import Link from "next/link";
import { Question } from "~/components/Question";

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
      <div className="space-y-14">
        <p className="text-title text-center text-5xl font-extrabold">
          Frequently Asked Questions
        </p>
        <div className="mx-auto max-w-screen-md space-y-1">
          {faq.map((question, i) => (
            <Question {...question} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
