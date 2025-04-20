"use client";
import { useSortable } from "@dnd-kit/sortable";
import { JobCard } from "./job-card";
import { Job } from "@/types";
import { CSS } from "@dnd-kit/utilities";

export function SortableJobCard({ job }: { job: Job }) {
  const {
    attributes,
    listeners,
    transition,
    setNodeRef,
    transform,
    isDragging,
  } = useSortable({
    id: job.id,
    data: {
      type: "job",
      meta: job,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <JobCard
      data-is-dragging={isDragging}
      className="data-[is-dragging=true]:opacity-40"
      ref={setNodeRef}
      style={style}
      job={job}
      {...listeners}
      {...attributes}
    />
  );
}
