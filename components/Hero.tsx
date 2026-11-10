"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import globe from "@/app/images/globe.png";

const TRENDING = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

export function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (location.trim()) params.set("location", location.trim());
    router.push(`/jobs${params.size ? `?${params}` : ""}`);
  }

  return (
    <section className="relative isolate w-full overflow-hidden bg-black">
      {/* top vignette: grey fading to black, darker toward the centre */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-105 bg-[linear-gradient(to_bottom,#2a2a2a_0%,#000_260px)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-105 bg-[radial-gradient(ellipse_55%_70%_at_50%_35%,#000_30%,transparent_100%)]"
      />

      {/* hero content (navbar is fixed, so the top padding clears it) */}
      <div className="relative z-10 mx-auto flex w-full max-w-200 flex-col items-center px-4 pt-36 text-center sm:px-6 sm:pt-48 lg:pt-[clamp(200px,18.75vw,290px)]">
        {/* badge */}
        <div className="flex w-full items-center justify-center gap-3">
          <span className="hidden h-px w-20 bg-white/15 sm:block" />
          <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/4 px-4 py-2.5 shadow-[0_0_0_1px_rgba(0,0,0,0.4)] lg:px-5 lg:py-3">
            <span aria-hidden className="text-lg leading-none">💼</span>
            <p className="font-mono text-xs uppercase tracking-wide text-white/50 sm:text-sm lg:text-base">
              <span className="font-bold text-white">50,000+</span> new jobs this month
            </p>
          </div>
          <span className="hidden h-px w-20 bg-white/15 sm:block" />
        </div>

        {/* heading */}
        <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="mt-4 max-w-190 text-pretty text-base leading-relaxed text-white/60 sm:text-lg lg:leading-8.25">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* search */}
        <form
          onSubmit={handleSearch}
          role="search"
          className="mt-12 flex w-full max-w-198 flex-col gap-2 rounded-2xl border border-white/15 bg-[#0e0e10] p-2 sm:flex-row sm:items-center sm:gap-0 sm:pl-6"
        >
          <label className="flex flex-1 items-center gap-2.5 px-2 sm:px-0">
            <Search aria-hidden className="size-6 shrink-0 text-white" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job title, skill or company"
              aria-label="Job title, skill or company"
              className="h-12 border-0 bg-transparent px-0 text-sm text-white shadow-none placeholder:text-white/50 focus-visible:ring-0 dark:bg-transparent"
            />
          </label>

          <span aria-hidden className="mx-4 hidden h-7 w-px bg-white/20 sm:block" />
          <span aria-hidden className="mx-2 h-px bg-white/10 sm:hidden" />

          <label className="flex flex-1 items-center gap-2.5 px-2 sm:px-0">
            <MapPin aria-hidden className="size-6 shrink-0 text-white" />
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location or Remote"
              aria-label="Location or Remote"
              className="h-12 border-0 bg-transparent px-0 text-sm text-white shadow-none placeholder:text-white/50 focus-visible:ring-0 dark:bg-transparent"
            />
          </label>

          <Button
            type="submit"
            aria-label="Search jobs"
            className="h-12 w-full shrink-0 rounded-xl bg-[#5b4bf5] text-white hover:bg-[#6c5ef7] sm:ml-2 sm:w-12 sm:px-0"
          >
            <Search className="size-6" />
            <span className="sm:hidden">Search jobs</span>
          </Button>
        </form>

        {/* trending */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-2 text-[15px] text-white/50">Trending Position</span>
          {TRENDING.map((role) => (
            <Link
              key={role}
              href={`/jobs?q=${encodeURIComponent(role)}`}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c6cf6]"
            >
              {role}
            </Link>
          ))}
        </div>
      </div>

      {/* globe + tagline (the next block of the page sits on top of the globe) */}
      <div className="relative mt-[-7.6vw] w-full overflow-hidden">
        <Image
          src={globe}
          alt=""
          aria-hidden
          priority
          className="pointer-events-none h-auto w-[190%] max-w-none translate-x-[-24%] select-none sm:w-full sm:translate-x-0"
        />

        <p className="absolute inset-x-0 top-[51%] mx-auto max-w-2xl px-4 text-center text-2xl font-medium leading-[1.2] text-white/55 sm:text-3xl lg:text-4xl">
          Assisting over{" "}
          <span className="text-white">15,000 job seekers</span>
          <br className="hidden sm:block" /> find their dream positions
        </p>
      </div>
    </section>
  );
}

export default Hero;