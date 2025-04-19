"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobCard } from "./job-card";
import { useNewJobForm } from "./new-job-form-provider";

interface Job {
  id: string;
  company: string;
  position: string;
  location: string;
  salary: string;
  date: string;
  logo: string;
  color: string;
}

interface Column {
  id: string;
  title: string;
  count: number;
  jobs: Job[];
}

interface KanbanColumnProps {
  column: Column;
}

export function KanbanColumn({ column }: KanbanColumnProps) {
  const { setOpen } = useNewJobForm();

  return (
    <div className="flex h-full w-80 flex-shrink-0 flex-col rounded-lg bg-gray-100 dark:bg-gray-800">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{column.title}</h3>
          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs dark:bg-gray-700">
            {column.count}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setOpen(true)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-2">
        {column.jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}

        <Button
          variant="ghost"
          className="w-full border border-dashed border-gray-500 bg-gray-300 hover:bg-gray-200"
          onClick={() => setOpen(true)}
        >
          <Plus className="h-4 w-4" />
          <span>Add job</span>
        </Button>
      </div>
    </div>
  );
}
