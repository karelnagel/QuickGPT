import { Poppins } from "next/font/google";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col" style={poppins.style}>
      <Header />
      <main className="mx-auto mb-auto flex w-full max-w-screen-lg">
        {children}
      </main>
      <Footer />
    </div>
  );
}
