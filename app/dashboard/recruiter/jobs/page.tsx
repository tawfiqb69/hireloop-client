
"use client"

import { useState } from "react"
import type { ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Briefcase,
  ChevronRight,
  Code,
  EllipsisVertical,
  Layers,
  type LucideIcon,
  Megaphone,
  MapPin,
  Pencil,
  PenTool,
  Plus,
  Trash2,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { JobData } from "./new/page"

/* ------------------------------ types -------------------------------- */

type JobRow = JobData & {
  id: string
  applicants: number
  posted: string
}

/* ------------------------------ dummy data ------------------------------ */

const DAY = 86_400_000

const daysFromNow = (n: number) =>
  new Date(Date.now() + n * DAY).toISOString().slice(0, 10)

const DUMMY_JOBS: JobRow[] = [
  {
    id: "job-1",
    title: "Frontend Developer",
    company: "HirePulse Network",
    category: "Engineering & Tech",
    type: "Full-time",
    isRemote: true,
    location: "New York, USA",
    deadline: daysFromNow(18),
    minSalary: 25,
    maxSalary: 40,
    frequency: "hour",
    responsibilities: "Build responsive, micro-interaction rich products.",
    requirements: "3+ years with React and TypeScript.",
    applicants: 34,
    posted: "Posted 4d ago",
  },
  {
    id: "job-2",
    title: "Senior Product Designer",
    company: "HirePulse Labs",
    category: "Design",
    type: "Full-time",
    isRemote: false,
    location: "London, UK",
    deadline: daysFromNow(32),
    minSalary: 90000,
    maxSalary: 115000,
    frequency: "year",
    responsibilities: "Own the design system and lead product discovery.",
    requirements: "5+ years in product design.",
    applicants: 19,
    posted: "Posted 1w ago",
  },
  {
    id: "job-3",
    title: "DevOps Specialist",
    company: "HirePulse Platform",
    category: "Engineering & Tech",
    type: "Full-time",
    isRemote: false,
    location: "Berlin, Germany",
    deadline: daysFromNow(45),
    minSalary: 95000,
    maxSalary: 120000,
    frequency: "year",
    responsibilities: "Maintain CI/CD pipelines and cloud infrastructure.",
    requirements: "Experience with Kubernetes and Terraform.",
    applicants: 12,
    posted: "Posted 2w ago",
  },
  {
    id: "job-4",
    title: "Product Marketing Lead",
    company: "HirePulse Network",
    category: "Marketing",
    type: "Full-time",
    isRemote: true,
    location: "EU/US",
    deadline: daysFromNow(60),
    minSalary: 80000,
    maxSalary: 105000,
    frequency: "year",
    responsibilities: "Lead go-to-market for new product launches.",
    requirements: "4+ years in B2B product marketing.",
    applicants: 27,
    posted: "Posted 5d ago",
  },
  {
    id: "job-5",
    title: "QA Automation Engineer",
    company: "HirePulse Platform",
    category: "Engineering & Tech",
    type: "Part-time",
    isRemote: false,
    location: "Dublin, Ireland",
    deadline: daysFromNow(-12),
    minSalary: 35,
    maxSalary: 50,
    frequency: "hour",
    responsibilities: "Write and maintain end-to-end test suites.",
    requirements: "Experience with Playwright or Cypress.",
    applicants: 8,
    posted: "Closed",
  },
]

/* -------------------------------- helpers -------------------------------- */

const CURRENCY = "€"

const FREQUENCY_LABEL: Record<string, string> = {
  hour: "hr",
  month: "mo",
  year: "yr",
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Engineering & Tech": Code,
  Design: PenTool,
  Product: Layers,
  Marketing: Megaphone,
}

function formatMoney(value: number) {
  return value >= 1000
    ? `${CURRENCY}${value / 1000}k`
    : `${CURRENCY}${value}`
}

function formatSalary(job: JobData) {
  const { minSalary, maxSalary } = job

  if (minSalary == null && maxSalary == null) {
    return "Not specified"
  }

  const unit = FREQUENCY_LABEL[job.frequency] ?? job.frequency

  if (minSalary != null && maxSalary != null) {
    return `${formatMoney(minSalary)} – ${formatMoney(maxSalary)} / ${unit}`
  }

  return `${formatMoney((minSalary ?? maxSalary) as number)} / ${unit}`
}

function formatLocation(job: JobData) {
  return job.isRemote
    ? `Remote (${job.location})`
    : job.location
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
}

// A job is Active until its deadline passes.
// No deadline means always Active.
function isActive(job: JobData) {
  return (
    !job.deadline ||
    new Date(`${job.deadline}T23:59:59`).getTime() >= Date.now()
  )
}

/* --------------------------------- page ---------------------------------- */

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<JobRow[]>(DUMMY_JOBS)

  function handleDelete(id: string) {
    if (!window.confirm("Delete this job post?")) return

    // TODO: Call your API here, then update the list.
    setJobs((prev) => prev.filter((job) => job.id !== id))
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <span>Manage Jobs</span>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">
            Job Listings &amp; Postings
          </span>
        </nav>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold tracking-tight">
              Manage Job Posts
            </h1>

            <p className="text-sm text-muted-foreground">
              Review live listings, monitor applicants, and update job
              details across your organization.
            </p>
          </div>

          <Link
            href="/dashboard/recruiter/jobs/new"
            className={cn(
              buttonVariants(),
              "h-10 gap-2 rounded-xl bg-[#5b4bf5] px-5 text-white hover:bg-[#6c5ef7]"
            )}
          >
            <Plus className="size-4" />
            New Job Post
          </Link>
        </div>
      </div>

      {/* Empty State */}
      {jobs.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          No job posts yet. Create your first listing with
          &ldquo;New Job Post&rdquo;.
        </div>
      ) : (
        <>
          {/* Tablet / Desktop Table */}
          <div className="hidden rounded-xl border md:block">
            <Table className="min-w-260">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-5 text-xs uppercase tracking-wider">
                    Job title &amp; dept
                  </TableHead>

                  <TableHead className="text-xs uppercase tracking-wider">
                    Company &amp; location
                  </TableHead>

                  <TableHead className="text-xs uppercase tracking-wider">
                    Type
                  </TableHead>

                  <TableHead className="text-xs uppercase tracking-wider">
                    Compensation
                  </TableHead>

                  <TableHead className="text-xs uppercase tracking-wider">
                    Applicants
                  </TableHead>

                  <TableHead className="text-xs uppercase tracking-wider">
                    Status
                  </TableHead>

                  <TableHead className="text-xs uppercase tracking-wider">
                    Deadline
                  </TableHead>

                  <TableHead className="pr-5 text-right text-xs uppercase tracking-wider">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id} className="h-19.25">
                    <TableCell className="pl-5">
                      <div className="flex items-center gap-3">
                        <JobIcon category={job.category} />

                        <div className="flex flex-col">
                          <span className="font-medium">
                            {job.title}
                          </span>

                          <span className="text-sm text-muted-foreground">
                            {job.category}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {job.company}
                        </span>

                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="size-3.5 shrink-0" />
                          {formatLocation(job)}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline">
                        {job.type}
                      </Badge>
                    </TableCell>

                    <TableCell className="whitespace-nowrap">
                      {formatSalary(job)}
                    </TableCell>

                    <TableCell>
                      <Applicants count={job.applicants} />
                    </TableCell>

                    <TableCell>
                      <StatusBadge active={isActive(job)} />
                    </TableCell>

                    <TableCell>
                      <Deadline job={job} />
                    </TableCell>

                    <TableCell className="pr-5">
                      <JobActions
                        job={job}
                        onDelete={handleDelete}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Job Cards */}
          <ul className="flex flex-col gap-3 md:hidden">
            {jobs.map((job) => (
              <li
                key={job.id}
                className="flex flex-col gap-4 rounded-xl border p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <JobIcon category={job.category} />

                    <div className="flex flex-col">
                      <span className="font-medium">
                        {job.title}
                      </span>

                      <span className="text-sm text-muted-foreground">
                        {job.category}
                      </span>
                    </div>
                  </div>

                  <StatusBadge active={isActive(job)} />
                </div>

                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  <Detail label="Company">
                    {job.company}
                  </Detail>

                  <Detail label="Location">
                    {formatLocation(job)}
                  </Detail>

                  <Detail label="Type">
                    <Badge variant="outline">
                      {job.type}
                    </Badge>
                  </Detail>

                  <Detail label="Compensation">
                    {formatSalary(job)}
                  </Detail>

                  <Detail label="Applicants">
                    <Applicants count={job.applicants} />
                  </Detail>

                  <Detail label="Deadline">
                    <Deadline job={job} />
                  </Detail>
                </dl>

                <JobActions
                  job={job}
                  onDelete={handleDelete}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

/* ---------------------------- small components ---------------------------- */

function JobIcon({ category }: { category: string }) {
  const Icon = CATEGORY_ICONS[category] ?? Briefcase

  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#5b4bf5]/15 text-[#7c6cf6]">
      <Icon className="size-5" />
    </span>
  )
}

function Applicants({ count }: { count: number }) {
  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      <Users className="size-4 text-muted-foreground" />
      {count} {count === 1 ? "Candidate" : "Candidates"}
    </span>
  )
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 border-transparent",
        active
          ? "bg-emerald-500/10 text-emerald-500"
          : "bg-red-500/10 text-red-400"
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          active ? "bg-emerald-500" : "bg-red-400"
        )}
      />

      {active ? "Active" : "Expired"}
    </Badge>
  )
}

function Deadline({ job }: { job: JobRow }) {
  return (
    <div className="flex flex-col whitespace-nowrap">
      <span>
        {job.deadline
          ? formatDate(job.deadline)
          : "No deadline"}
      </span>

      <span className="text-sm text-muted-foreground">
        {isActive(job) ? job.posted : "Closed"}
      </span>
    </div>
  )
}

function Detail({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>

      <dd>{children}</dd>
    </div>
  )
}

function JobActions({
  job,
  onDelete,
}: {
  job: JobRow
  onDelete: (id: string) => void
}) {
  const router = useRouter()

  return (
    <div className="flex items-center justify-end gap-1.5">
      <Link
        href={`/dashboard/recruiter/jobs/${job.id}/edit`}
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "gap-1.5"
        )}
      >
        <Pencil className="size-4" />
        Update
      </Link>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Delete ${job.title}`}
        onClick={() => onDelete(job.id)}
        className="text-muted-foreground hover:text-red-400"
      >
        <Trash2 className="size-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={`More actions for ${job.title}`}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "text-muted-foreground"
          )}
        >
          <EllipsisVertical className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/dashboard/recruiter/applications?job=${job.id}`
              )
            }
          >
            View applicants
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
