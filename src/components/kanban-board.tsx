"use client";
import { KanbanColumn } from "./kanban-column";
import { Column, Job } from "@/types";
import { useColumns } from "@/hooks/useColumns";
import {
  closestCenter,
  DndContext,
  DragOverEvent,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useQueryClient } from "@tanstack/react-query";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import { JobCard } from "./job-card";

export function KanbanBoard({ initialData }: { initialData?: Column[] }) {
  const { data: columns, error, isLoading } = useColumns(initialData);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const queryClient = useQueryClient();
  const [activeJob, setActiveJob] = useState<Job | undefined>();

  if (error) {
    return <div>An error occured. Please try again later</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;

    if (active.id !== over?.id) {
      if (over?.data.current?.type !== "column") return;

      const columnId = Number(over.id);
      const job = active.data.current?.meta;

      if (job?.column_id === columnId) return; // Ignore moving to the same column

      queryClient.setQueryData<Column[]>(["columns"], (oldColumns) => {
        if (!oldColumns) return oldColumns;

        return oldColumns.map((col) => {
          if (col.id !== Number(columnId)) {
            return { ...col, jobs: col.jobs.filter((j) => j.id !== job?.id) };
          }

          return {
            ...col,
            jobs: [...col.jobs, { ...job, column_id: columnId }],
          };
        });
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(e) => setActiveJob(e.active.data.current?.meta)}
      onDragEnd={(e) => setActiveJob(undefined)}
      onDragOver={handleDragOver}
    >
      <div className="flex h-full space-x-4 pb-4">
        {columns?.map((column) => (
          <KanbanColumn key={column.id} column={column} />
        ))}
      </div>

      <DragOverlay>
        {activeJob ? <JobCard job={activeJob} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
