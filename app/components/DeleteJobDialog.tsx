
"use client"

import { Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import type { JobRow } from "../dashboard/recruiter/jobs/page"
import { deleteJob } from "@/lib/actions/jobs"
import { useState } from "react"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

export function DeleteJobDialog({ job }: { job: JobRow }) {
    const router = useRouter()
    const [open, setOpen] = useState(false)


  const handleDelete = async()=>{
    const res = await deleteJob(job._id);

    console.log("Delete Job ID:", job._id, res)
    if(res.deletedCount){
        setOpen(false);
        toast.add({
            title: "Job Deleted",
            description: "The job has been permanently deleted"
        })
        router.refresh()
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={<Button variant="destructive" size="icon" />}
      >
        <Trash2Icon />
      </AlertDialogTrigger>

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>

          <AlertDialogTitle>
            Delete job?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong>{job.title}</strong>?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
