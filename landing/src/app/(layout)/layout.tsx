import { Poppins } from "next/font/google";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import Image from "next/image";

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
    <div className="relative flex min-h-screen flex-col" style={poppins.style}>
      <div className="fixed h-screen w-screen">
        <Image src="/bg16.jpg" fill={true} alt="" className="fixed" priority />
      </div>
      <Header />
      <main className="relative mb-auto flex w-full ">{children}</main>
      <Footer />
    </div>
  );
}
