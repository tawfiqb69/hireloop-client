
"use client"

import { useState } from "react"
import type { FormEvent, ReactNode } from "react"
import Link from "next/link"
import {
  Building2,
  ChevronRight,
  DollarSign,
  Globe,
  MapPin,
  Send,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { createJob } from "@/lib/actions/jobs"

const CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Product",
  "Marketing",
]

const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
]

const FREQUENCIES = [
  { value: "hour", label: "per hour" },
  { value: "month", label: "per month" },
  { value: "year", label: "per year" },
]

export type JobData = {
  title: string
  company: string
  category: string
  type: string
  isRemote: boolean
  location: string
  deadline: string
  minSalary: number | null
  maxSalary: number | null
  frequency: string
  responsibilities: string
  requirements: string
}

export default function NewJobPage() {
  const [jobType, setJobType] = useState<string>("Full-time")
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    // Collect form data
    const formData = new FormData(event.currentTarget)

    // Convert entries into an object
    const data = Object.fromEntries(formData.entries())

    // Required fields
    const requiredFields = [
      "title",
      "company",
      "category",
      "location",
      "responsibilities",
      "requirements",
    ]

    const isInvalid = requiredFields.some(
      (field) => !String(data[field] ?? "").trim()
    )

    if (isInvalid) {
      setError("Please fill in all the required fields.")
      return
    }

    // Prepare job data
    const job: JobData = {
      title: String(data.title),
      company: String(data.company),
      category: String(data.category),
      type: String(data.type),
      isRemote: formData.has("isRemote"),
      location: String(data.location),
      deadline: String(data.deadline ?? ""),
      minSalary: data.minSalary
        ? Number(data.minSalary)
        : null,
      maxSalary: data.maxSalary
        ? Number(data.maxSalary)
        : null,
      frequency: String(data.frequency),
      responsibilities: String(data.responsibilities),
      requirements: String(data.requirements),
    }

    console.log("[new job]", job)

    // TODO: Send job data to API

    const result = await createJob(job)
    console.log('Created Job result:', result);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6"
    >
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-3">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link
              href="/dashboard/recruiter/jobs"
              className="hover:text-foreground"
            >
              Manage Jobs
            </Link>

            <ChevronRight className="size-3.5" />

            <span className="text-foreground">
              Create New Listing
            </span>
          </nav>

          <h1 className="text-3xl font-semibold tracking-tight">
            Post a New Job
          </h1>

          <p className="text-sm text-muted-foreground">
            Fill in the position specifications to attract qualified talent across our network.
          </p>
        </div>

        <Button
          type="submit"
          className="h-11 gap-2 rounded-xl bg-[#5b4bf5] px-6 text-white hover:bg-[#6c5ef7]"
        >
          Publish Job
          <Send className="size-4" />
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400"
        >
          {error}
        </p>
      )}

      {/* 1. Basic Information */}
      <Card>
        <SectionTitle>1. Basic Information</SectionTitle>

        <CardContent className="flex flex-col gap-5">
          <Field label="Job Title *" htmlFor="title">
            <Input
              id="title"
              name="title"
              placeholder="Frontend Developer"
              className="h-11"
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Company Name *" htmlFor="company">
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="company"
                  name="company"
                  placeholder="HirePulse Network"
                  className="h-11 pl-10"
                />
              </div>
            </Field>

            <Field label="Job Category *" htmlFor="category">
              <Select name="category">
                <SelectTrigger
                  id="category"
                  className="h-11 w-full"
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>

                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Job Type *</Label>

            <input
              type="hidden"
              name="type"
              value={jobType}
            />

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {JOB_TYPES.map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant="outline"
                  aria-pressed={jobType === type}
                  onClick={() => setJobType(type)}
                  className={cn(
                    "h-11 rounded-lg",
                    jobType === type &&
                      "border-[#5b4bf5] bg-[#5b4bf5]/10 text-[#7c6cf6] hover:bg-[#5b4bf5]/15 hover:text-[#7c6cf6]"
                  )}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Location, Compensation & Timeline */}
      <Card>
        <SectionTitle>
          2. Location, Compensation &amp; Timeline
        </SectionTitle>

        <CardContent className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4 rounded-lg border p-3.5">
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#5b4bf5]/15 text-[#7c6cf6]">
                <Globe className="size-5" />
              </span>

              <div>
                <Label htmlFor="isRemote">
                  Remote Work Allowed
                </Label>

                <p className="text-sm text-muted-foreground">
                  Enable worldwide or distributed candidate applications
                </p>
              </div>
            </div>

            <Switch
              id="isRemote"
              name="isRemote"
              value="true"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Job Location"
              htmlFor="location"
              hint="Required"
            >
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="location"
                  name="location"
                  placeholder="New York, USA"
                  className="h-11 pl-10"
                />
              </div>
            </Field>

            <Field
              label="Application Deadline"
              htmlFor="deadline"
            >
              <Input
                id="deadline"
                name="deadline"
                type="date"
                className="h-11"
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <Field
              label="Min Salary / Rate"
              htmlFor="minSalary"
            >
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="minSalary"
                  name="minSalary"
                  type="number"
                  min={0}
                  placeholder="25"
                  className="h-11 pl-9"
                />
              </div>
            </Field>

            <Field
              label="Max Salary / Rate"
              htmlFor="maxSalary"
            >
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="maxSalary"
                  name="maxSalary"
                  type="number"
                  min={0}
                  placeholder="40"
                  className="h-11 pl-9"
                />
              </div>
            </Field>

            <Field label="Frequency" htmlFor="frequency">
              <Select name="frequency" defaultValue="hour">
                <SelectTrigger
                  id="frequency"
                  className="h-11 w-full"
                >
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {FREQUENCIES.map((item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
        </CardContent>
      </Card>

      {/* 3. Responsibilities & Requirements */}
      <Card>
        <SectionTitle>
          3. Responsibilities &amp; Requirements
        </SectionTitle>

        <CardContent className="flex flex-col gap-5">
          <Field
            label="Key Responsibilities *"
            htmlFor="responsibilities"
          >
            <Textarea
              id="responsibilities"
              name="responsibilities"
              placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers..."
              className="min-h-28"
            />
          </Field>

          <Field
            label="Qualifications & Requirements *"
            htmlFor="requirements"
          >
            <Textarea
              id="requirements"
              name="requirements"
              placeholder={"• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs"}
              className="min-h-28"
            />
          </Field>
        </CardContent>
      </Card>
    </form>
  )
}

// Reusable Section Title
function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-3 text-base">
        <span className="size-2 rounded-full bg-[#5b4bf5]" />
        {children}
      </CardTitle>
    </CardHeader>
  )
}

// Reusable Form Field
type FieldProps = {
  label: string
  htmlFor: string
  hint?: string
  children: ReactNode
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={htmlFor}>{label}</Label>

        {hint && (
          <span className="text-xs text-muted-foreground">
            {hint}
          </span>
        )}
      </div>

      {children}
    </div>
  )
}
