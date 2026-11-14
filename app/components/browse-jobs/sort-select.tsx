"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SORT_OPTIONS = [
  { label: "Most Recent", value: "recent" },
  { label: "Salary: High to Low", value: "salary-desc" },
  { label: "Salary: Low to High", value: "salary-asc" },
  { label: "Most Relevant", value: "relevant" },
]

export function SortSelect({ defaultValue = "recent" }: { defaultValue?: string }) {
  function handleChange(value: string | null) {
    // TODO: put `value` in the URL (?sort=...)
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-white/60">Sort by:</span>
      {/* `items` lets the select show the label ("Most Recent") instead of the value ("recent") */}
      <Select items={SORT_OPTIONS} defaultValue={defaultValue} onValueChange={handleChange}>
        <SelectTrigger aria-label="Sort jobs" className="h-9 w-48 border-white/10 bg-[#141418] text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}