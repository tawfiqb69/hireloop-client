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

export type JobRow = JobData & { _id: string; applicants: number; posted: string }