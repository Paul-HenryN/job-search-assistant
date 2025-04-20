"use client";
import { KanbanColumn } from "./kanban-column";
import { Column } from "@/types";
import { useColumns } from "@/hooks/useColumns";

export function KanbanBoard({ initialData }: { initialData?: Column[] }) {
  const { data: columns, error, isLoading } = useColumns(initialData);

  if (error) {
    return <div>An error occured. Please try again later</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full space-x-4 pb-4">
      {columns?.map((column) => (
        <KanbanColumn key={column.id} column={column} />
      ))}
    </div>
  );
}
