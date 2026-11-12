import Link from "next/link";
import Image from "next/image";


import logo from "@/app/images/logo.png";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Same dark stage as the hero so the fixed navbar blends in above it
    <main className="relative isolate flex min-h-svh w-full flex-col items-center overflow-hidden bg-black px-4 pt-28 pb-16 sm:px-6 sm:pt-32">
      {/* top vignette: grey fading to black, matching the hero treatment */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[linear-gradient(to_bottom,#2a2a2a_0%,#000_260px)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(ellipse_55%_70%_at_50%_35%,#000_30%,transparent_100%)]"
      />

      <div className="flex w-full max-w-md flex-col items-center gap-8">
        <Link href="/" aria-label="Hireloop home" className="shrink-0">
          <Image src={logo} alt="Hireloop" priority className="h-9 w-auto" />
        </Link>

        

        {children}
      </div>
    </main>
  );
}
