import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "DeskGPT - ChatGPT in your PC",
  description:
    " ChatGPT client for Mac, Windows and Linux, for super easy and fast access.",
  icons: [{ url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col" style={inter.style}>
      <Header />
      <main className="mx-auto mb-auto flex w-full max-w-screen-lg">
        {children}
      </main>
      <Footer />
    </div>
  );
}
