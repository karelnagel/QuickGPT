import { faq, features, github } from "~/config";
import { Download } from "~/components/Download";
import Link from "next/link";
import { Question } from "~/components/Question";

export default function Page() {
  return (
    <div className="w-full text-center  md:text-left">
      <div className="mx-auto my-10 flex w-full max-w-screen-lg flex-col-reverse items-center justify-between text-white md:my-36 md:flex-row">
        <div className="max-w-xl space-y-6">
          <h1 className="text-title text-[40px] font-bold leading-[1.1]  md:text-[60px]">
            Experience the Power of ChatGPT on Your Desktop
          </h1>
          <h2 className="text-xl leading-[1.4] ">
            The Fastest, Most User-Friendly ChatGPT Application - And It's Open
            Source! Designed for Mac, Windows and Linux.
          </h2>
          <div className="flex justify-center space-x-2 md:justify-start">
            <Download />
            <a
              href={github}
              target="_blank"
              className="btn-outline btn border-white normal-case text-white"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="group flex shrink-0 flex-col items-end px-14 md:w-[440px] md:px-0">
          <video
            src="/recording.mov"
            className=" w-full rounded-lg"
            autoPlay
            muted
            disablePictureInPicture
          />
          <Link href="/app" className="invisible text-sm group-hover:visible">
            Open Online App
          </Link>
        </div>
      </div>
      <div className="bg-base-200 px-2">
        <div className="mx-auto max-w-screen-lg space-y-20 py-20">
          <div className="space-y-14">
            <p className="text-title text-center text-3xl font-bold md:text-5xl">
              Get More Done with QuickGPT
            </p>
            <div className="mx-auto grid max-w-screen-md grid-cols-1 gap-10 md:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-center space-y-4 md:items-start"
                >
                  <feature.image className="gradient h-14 w-14 rounded-lg bg-gradient-to-tr from-primary to-secondary p-2 text-white" />
                  <h3 className="text-xl font-bold">{feature.title}</h3>

                  <p className="text-base">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className=" space-y-14">
            <p className="text-title text-center text-3xl font-bold md:text-5xl">
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
