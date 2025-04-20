"use client";
import { KanbanColumn } from "./kanban-column";
import { Column, Job } from "@/types";
import { useColumns } from "@/hooks/useColumns";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { JobCard } from "./job-card";
import { updateJobStatus } from "@/actions/jobs";

export function KanbanBoard({ initialData }: { initialData?: Column[] }) {
  const {
    data: columns,
    error,
    isLoading,
  } = useColumns({
    initialData,
  });

  const [optimisticColumns, setOptimisticColumns] = useState<
    Column[] | undefined
  >();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: updateJobStatus,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["columns"] }),
    onError: console.error,
  });

  const [activeJob, setActiveJob] = useState<Job | undefined>();

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;

    if (active.id !== over?.id) {
      if (over?.data.current?.type !== "column") return;

      const columnId = Number(over.id);
      const job = active.data.current?.meta;

      if (job?.column_id === columnId) return; // Ignore moving to the same column

      setOptimisticColumns((oldColumns) => {
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

  const handleDragEnd = async (e: DragEndEvent) => {
    setActiveJob(undefined);

    const { active, over } = e;

    if (active.id !== over?.id) {
      if (active.data.current?.type !== "job") return;
      if (over?.data.current?.type !== "column") return;

      const jobId = Number(active.id);
      const columnId = Number(over.id);

      const columns = queryClient.getQueryData<Column[]>(["columns"]);
      const jobs = columns?.map((col) => col.jobs).flat();

      const targetColumn = columns?.find((col) => col.id === columnId);
      const targetJob = jobs?.find((job) => job.id === jobId);

      if (!targetColumn || !targetJob) return;
      if (targetJob.column_id === targetColumn.id) return; // Ignore moving to the same column

      console.log("Moving job", targetJob, "to column", targetColumn);

      await mutateAsync({ jobId: targetJob.id, newColumnId: targetColumn.id });
    }
  };

  useEffect(() => setOptimisticColumns(columns), [columns]);

  if (error) {
    return <div>An error occured. Please try again later</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(e) => setActiveJob(e.active.data.current?.meta)}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="flex h-full space-x-4 pb-4">
        {optimisticColumns?.map((column) => (
          <KanbanColumn key={column.id} column={column} />
        ))}
      </div>

      <DragOverlay>
        {activeJob ? <JobCard job={activeJob} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
