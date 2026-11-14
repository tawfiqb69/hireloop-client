import { getJobs } from "@/lib/api/jobs"
import type { JobRow } from "../dashboard/recruiter/jobs/page"
import { JobCard } from "../components/browse-jobs/job-card"
import { JobFilters } from "../components/browse-jobs/job-filters"
import { SearchBar } from "../components/browse-jobs/search-bar"
import { SortSelect } from "../components/browse-jobs/sort-select"

type SearchParams = { [key: string]: string | string[] | undefined }

// A search param can be missing, a single value or a list: always give back a list.
function toArray(value: string | string[] | undefined) {
  if (value === undefined) return []
  return Array.isArray(value) ? value : [value]
}

const BrowseJobsPage = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
  const params = await searchParams

  // Turn the page URL params into a query string for the API (keeps repeated params like ?type=a&type=b)
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    toArray(value).forEach((item) => query.append(key, item))
  }

  const jobs: JobRow[] = await getJobs(query.toString())

  return (
    <main className="min-h-screen bg-black px-4 pb-16 pt-28 text-white sm:px-6 lg:pt-36">
      <h1 className="sr-only">Browse Jobs</h1>

      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <SearchBar defaultValue={toArray(params.search)[0]} />

        <div className="grid gap-8 lg:grid-cols-[296px_1fr]">
          <JobFilters
            selected={{
              type: toArray(params.type),
              remote: toArray(params.remote),
              category: toArray(params.category),
            }}
          />

          <section className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">
                Found {jobs.length.toLocaleString()} Professional {jobs.length === 1 ? "Job" : "Jobs"}
              </h2>
              <SortSelect defaultValue={toArray(params.sort)[0]} />
            </div>

            {jobs.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-white/60">
                No jobs found. Try a different search or filter.
              </p>
            ) : (
              <ul className="flex flex-col gap-4">
                {jobs.map((job) => (
                  <li key={job._id}>
                    <JobCard job={job} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default BrowseJobsPage