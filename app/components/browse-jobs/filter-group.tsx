"use client"

import { useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export type FilterOption = {
  label: string
  value: string
  count?: number // optional: shown on the right when provided
}

type FilterGroupProps = {
  title: string
  name: string // used to build unique ids, e.g. "type"
  options: FilterOption[]
  selected: string[]
  multiple?: boolean // false (default) = only one option can be selected
  onChange: (value: string, checked: boolean) => void
}

// One group of checkboxes, e.g. "Job Type".
export function FilterGroup({
  title,
  name,
  options,
  selected,
  multiple = false,
  onChange,
}: FilterGroupProps) {
  // In single mode only the first selected value is kept.
  const [values, setValues] = useState(multiple ? selected : selected.slice(0, 1))

  function handleCheckedChange(value: string, checked: boolean) {
    if (multiple) {
      // add or remove just this option
      setValues((prev) => (checked ? [...prev, value] : prev.filter((item) => item !== value)))
    } else {
      // checking an option replaces the old one; unchecking leaves nothing selected
      setValues(checked ? [value] : [])
    }
    onChange(value, checked)
  }

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-base font-semibold text-white">{title}</legend>

      {options.map((option) => {
        const id = `${name}-${option.value}`
        return (
          <Label key={option.value} htmlFor={id} className="cursor-pointer gap-3 font-normal text-white/80">
            <Checkbox
              id={id}
              checked={values.includes(option.value)}
              onCheckedChange={(checked) => handleCheckedChange(option.value, checked)}
              className="border-white/20 data-checked:border-[#5b4bf5] data-checked:bg-[#5b4bf5] focus-visible:ring-[#5b4bf5]/25"
            />
            <span>{option.label}</span>
            {option.count !== undefined && (
              <span className="ml-auto text-sm text-white/40">{option.count}</span>
            )}
          </Label>
        )
      })}
    </fieldset>
  )
}