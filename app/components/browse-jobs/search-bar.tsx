"use client"

import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: read the input value and update the URL (?search=...)
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#141418] p-4 sm:flex-row sm:p-6"
    >
      <div className="relative flex-1">
        <Search aria-hidden className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/50" />
        <Input
          name="search"
          defaultValue={defaultValue}
          placeholder="Search by job title, keywords..."
          aria-label="Search jobs"
          className="h-14 rounded-xl border-white/10 bg-[#1b1b1c] pl-12 text-base text-white placeholder:text-white/40 focus-visible:border-[#5b4bf5] focus-visible:ring-[#5b4bf5]/25"
        />
      </div>

      <Button
        type="submit"
        className="h-14 rounded-xl bg-[#5b4bf5] px-8 text-base font-medium text-white hover:bg-[#6c5ef7]"
      >
        Search Jobs
      </Button>
    </form>
  )
}