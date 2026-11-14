import { Bookmark, Briefcase, DollarSign, Globe } from "lucide-react"
import { JobRow } from "@/types/job"
import { Button } from "@/components/ui/button"

const FREQUENCY_SUFFIX: Record<string, string> = { hour: "/ hr", month: "/ mo" }

function formatMoney(value: number) {
  return value >= 1000 ? `$${value / 1000}k` : `$${value}`
}

// "$140k - $180k" (yearly pay has no suffix, like in the design)
function formatSalary({ minSalary, maxSalary, frequency }: JobRow) {
  if (minSalary == null && maxSalary == null) return null

  const range =
    minSalary != null && maxSalary != null
      ? `${formatMoney(minSalary)} - ${formatMoney(maxSalary)}`
      : formatMoney((minSalary ?? maxSalary) as number)

  const suffix = FREQUENCY_SUFFIX[frequency]
  return suffix ? `${range} ${suffix}` : range
}

export function JobCard({ job }: { job: JobRow }) {
  const salary = formatSalary(job)

  return (
    <article className="flex gap-5 rounded-2xl border border-white/10 bg-[#141418] p-6">
      {/* No company logo in the data yet, so show the first letter */}
      <div
        aria-hidden
        className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl font-semibold text-white"
      >
        {job.company.charAt(0).toUpperCase()}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-xl font-semibold text-white">{job.title}</h3>
            <p className="mt-1 text-white/60">
              {job.company} • {job.location}
              {job.isRemote && " (Remote)"}
            </p>
          </div>

          <Button type="button" variant="ghost" size="icon" aria-label="Save job" className="text-white/60 hover:text-white">
            <Bookmark className="size-5" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-3">
          {salary && <JobTag icon={DollarSign}>{salary}</JobTag>}
          <JobTag icon={Briefcase}>{job.type}</JobTag>
          {job.isRemote && <JobTag icon={Globe}>Remote</JobTag>}
        </div>
      </div>
    </article>
  )
}

function JobTag({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg bg-white/6 px-3 py-1.5 text-sm text-white/80">
      <Icon className="size-3.5" />
      {children}
    </span>
  )
}