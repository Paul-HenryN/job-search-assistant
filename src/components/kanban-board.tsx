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
import { updateJob } from "@/actions/jobs";

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
  const { mutate } = useMutation({
    mutationFn: async (updatedJobs: Job[]) =>
      Promise.all(
        updatedJobs.map((j) => updateJob({ jobId: j.id, payload: j }))
      ),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["columns"] }),
    onError: console.error,
  });

  const [activeJob, setActiveJob] = useState<Job | undefined>();

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;

    if (active.id === over?.id) return;
    if (active.data.current?.type !== "job") return;

    if (over?.data.current?.type === "column") {
      const targetColumnId = Number(over.id);
      const job = active.data.current?.meta;

      if (job?.column_id === targetColumnId) return; // Ignore moving to the same column

      setOptimisticColumns((oldColumns) => {
        if (!oldColumns) return oldColumns;

        return oldColumns.map((col) => {
          if (col.id !== Number(targetColumnId)) {
            return { ...col, jobs: col.jobs.filter((j) => j.id !== job?.id) };
          }

          return {
            ...col,
            jobs: [
              ...col.jobs,
              { ...job, column_id: targetColumnId, order: col.jobs.length },
            ],
          };
        });
      });
    } else if (over?.data.current?.type === "job") {
      const activeJob = active.data.current?.meta;
      const overJob = over.data.current?.meta;

      setOptimisticColumns((oldColumns) => {
        if (!oldColumns) return oldColumns;

        return oldColumns.map((col) => {
          // If it's the target column
          if (col.id === overJob?.column_id) {
            const newJobs =
              activeJob?.column_id === overJob?.column_id
                ? col.jobs.map((j) => {
                    if (j.id === activeJob?.id)
                      return { ...j, order: over.data.current?.sortable.index };
                    if (j.id === overJob?.id)
                      return {
                        ...j,
                        order: active.data.current?.sortable.index,
                      };

                    return j;
                  })
                : col.jobs
                    .map((j) => {
                      if (j.order >= over.data.current?.sortable.index) {
                        return { ...j, order: j.order + 1 };
                      }

                      return j;
                    })
                    .concat([
                      {
                        ...activeJob,
                        order: over.data.current?.sortable.index,
                        column_id: col.id,
                      },
                    ]);

            return {
              ...col,
              jobs: newJobs,
            };
          }

          // If it's the source column
          if (col.id === activeJob?.column_id) {
            return {
              ...col,
              jobs: col.jobs
                .filter((j) => j.id !== activeJob?.id)
                .map((j) => {
                  if (j.order > activeJob?.order) {
                    return { ...j, order: j.order - 1 };
                  }

                  return j;
                }),
            };
          }

          return {
            ...col,
            jobs: col.jobs.filter((j) => j.id !== activeJob?.id),
          };
        });
      });
    }
  };

  const handleDragEnd = async (e: DragEndEvent) => {
    setActiveJob(undefined);

    const cachedColumns = queryClient.getQueryData<Column[]>(["columns"]);
    const cachedJobs = cachedColumns?.map((c) => c.jobs).flat();
    const optimisticJobs = optimisticColumns?.map((c) => c.jobs).flat();

    const updatedJobs = optimisticJobs?.filter((j) => {
      const cachedJob = cachedJobs?.find((cj) => cj.id === j.id);
      return JSON.stringify(cachedJob) !== JSON.stringify(j);
    });

    console.log(updatedJobs?.length, "jobs updated", updatedJobs);

    if (updatedJobs) mutate(updatedJobs);
  };

  useEffect(() => setOptimisticColumns(columns), [columns]); // Sync optimistic columns with fetched data

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
