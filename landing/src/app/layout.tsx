import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuickGPT - ChatGPT in your PC",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
