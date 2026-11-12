"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import logo from "@/app/images/logo.png";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useSession, signOut } from "@/lib/auth-client";

const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      aria-label="Hireloop home"
      onClick={onClick}
      className="flex shrink-0 items-center"
    >
      <Image
        src={logo}
        alt="Hireloop"
        priority
        className="h-8 w-auto lg:h-10"
      />
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { data: session } = useSession()
  console.log('user session in navbar', session);

  const handleSignOut = async () => {
    await signOut();
  }

  return (
    // Fixed + transparent wrapper so the hero's grey/black background shows
    // around the floating bar, exactly like the design.
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4 lg:px-10 xl:px-15 xl:pt-4.5">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-330 items-center justify-between rounded-2xl bg-[#202022] px-4 shadow-[0_8px_24px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.03)] sm:h-[60px] lg:h-[73px] lg:pl-7 lg:pr-2"
      >
        <Logo />

        {/* Desktop */}
        <div className="hidden items-center md:flex">
          <ul className="flex items-center gap-6 lg:gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-sm text-sm text-white transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c6cf6] lg:text-base"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Separator
            orientation="vertical"
            className="mx-4 h-10 bg-white/25 lg:mx-6"
          />

          {
            session?.user ?
              <>
                <span className="text-[#EDEDEF] px-2">Welcome, {session.user.name} </span>
                <Button
                  onClick={handleSignOut}
                  className={cn(
                    buttonVariants(),
                    "ml-3 h-10 rounded-xl bg-[#5b4bf5] px-4 text-sm font-medium text-white hover:bg-[#6c5ef7] lg:ml-4 lg:h-[52px] lg:px-6 lg:text-base"
                  )}
                >
                  Sign Out
                </Button>
              </>
              : <>

                <Link
                  href="/sign-in"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-10 px-3 text-sm font-medium text-[#7c6cf6] hover:bg-transparent hover:text-[#9a8dff] lg:h-13 lg:px-6 lg:text-base"
                  )}
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  className={cn(
                    buttonVariants(),
                    "ml-3 h-10 rounded-xl bg-[#5b4bf5] px-4 text-sm font-medium text-white hover:bg-[#6c5ef7] lg:ml-4 lg:h-[52px] lg:px-6 lg:text-base"
                  )}
                >
                  Get Started
                </Link>
              </>
          }

        </div>

        {/* Mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 hover:text-white md:hidden"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="size-6" />
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="right"
            className="w-[85%] max-w-sm border-white/10 bg-[#202022] text-white"
          >
            <SheetHeader className="text-left">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <Logo onClick={close} />
            </SheetHeader>

            <ul className="mt-2 flex flex-col px-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="block py-3 text-base text-white transition-colors hover:text-white/70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Separator className="mx-4 w-auto bg-white/15" />

            <div className="flex flex-col gap-3 px-4 pt-2">
              <Link
                href="/sign-in"
                onClick={close}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-11 justify-center text-base font-medium text-[#7c6cf6] hover:bg-white/5 hover:text-[#9a8dff]"
                )}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={close}
                className={cn(
                  buttonVariants(),
                  "h-11 rounded-xl bg-[#5b4bf5] text-base font-medium text-white hover:bg-[#6c5ef7]"
                )}
              >
                Get Started
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

export default Navbar;