"use client"

import { FilterGroup, type FilterOption } from "./filter-group"

// Filter options. Each one matches a field of JobRow.
// Job Type and Category allow one choice at a time; Work Mode allows both (see `multiple` below).
const JOB_TYPES: FilterOption[] = [
  { label: "Full-time", value: "Full-time" },
  { label: "Part-time", value: "Part-time" },
  { label: "Contract", value: "Contract" },
  { label: "Internship", value: "Internship" },
]

const WORK_MODES: FilterOption[] = [
  { label: "Remote", value: "true" }, // isRemote = true
  { label: "On-site", value: "false" }, // isRemote = false
]

const CATEGORIES: FilterOption[] = [
  { label: "Engineering & Tech", value: "Engineering & Tech" },
  { label: "Design", value: "Design" },
  { label: "Product", value: "Product" },
  { label: "Marketing", value: "Marketing" },
]

type JobFiltersProps = {
  selected: {
    type: string[]
    remote: string[]
    category: string[]
  }
}

export function JobFilters({ selected }: JobFiltersProps) {
  // `filter` is "type", "remote" or "category".
  function handleChange(filter: string, value: string, checked: boolean) {
    // TODO: add or remove `value` for `filter` in the URL
  }

  return (
    <aside className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-[#141418] p-6 lg:sticky lg:top-28 lg:self-start">
      <h2 className="text-lg font-semibold text-white">Filters</h2>

      <FilterGroup
        title="Job Type"
        name="type"
        options={JOB_TYPES}
        selected={selected.type}
        onChange={(value, checked) => handleChange("type", value, checked)}
      />
      <FilterGroup
        title="Work Mode"
        name="remote"
        options={WORK_MODES}
        selected={selected.remote}
        multiple
        onChange={(value, checked) => handleChange("remote", value, checked)}
      />
      <FilterGroup
        title="Category"
        name="category"
        options={CATEGORIES}
        selected={selected.category}
        onChange={(value, checked) => handleChange("category", value, checked)}
      />
    </aside>
  )
}