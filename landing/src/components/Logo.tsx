import Link from "next/link";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={` text-2xl md:text-3xl ${className}`}>
      QuickGPT
    </Link>
  );
};
