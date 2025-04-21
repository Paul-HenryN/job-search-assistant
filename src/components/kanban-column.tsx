"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNewJobForm } from "./new-job-form-provider";
import { Column } from "@/types";
import { SortableContext } from "@dnd-kit/sortable";
import { SortableJobCard } from "./sortable-job-card";
import { useDroppable } from "@dnd-kit/core";

interface KanbanColumnProps {
  column: Column;
}

export function KanbanColumn({ column }: KanbanColumnProps) {
  const { setOpen, setDefaultColumnId } = useNewJobForm();
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: {
      type: "column",
      meta: column,
    },
    disabled: column.jobs.length > 0,
  });

  const sortedJobs = column.jobs.toSorted((a, b) => a.order - b.order);

  const openNewJobForm = () => {
    setDefaultColumnId(column.id);
    setOpen(true);
  };

  return (
    <div
      data-over={isOver}
      className="flex h-full w-80 flex-shrink-0 flex-col rounded-lg overflow-y-auto bg-gray-100 dark:bg-gray-800 data-[over=true]:outline-orange-300 data-[over=true]:outline-dashed"
    >
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{column.name}</h3>
          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs dark:bg-gray-700">
            {column.jobs.length}
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

      <div className="p-2">
        <SortableContext items={sortedJobs}>
          <div
            ref={setNodeRef}
            className="flex-1 space-y-3 overflow-y-auto min-h-32 overflow-x-hidden"
          >
            {sortedJobs.map((job) => (
              <SortableJobCard key={job.id} job={job} />
            ))}
          </div>
        </SortableContext>

        <Button
          variant="ghost"
          className="w-full border border-dashed border-gray-500 bg-gray-300 hover:bg-gray-200 mt-4"
          onClick={openNewJobForm}
        >
          <Plus className="h-4 w-4" />
          <span>Add job</span>
        </Button>
      </div>
    </div>
  );
}
