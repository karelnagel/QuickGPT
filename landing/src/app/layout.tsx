import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import "./globals.css";

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
    <html lang="en" style={inter.style}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto mb-auto flex w-full max-w-screen-lg">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
