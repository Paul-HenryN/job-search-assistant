import { createClient } from "@/lib/supabase/server";
import { KanbanColumn } from "./kanban-column";

export async function KanbanBoard() {
  const supabase = await createClient();
  const { data: columns, error } = await supabase
    .from("columns")
    .select("*,jobs(*)");

  if (error) {
    return <div>An error occured. Please try again later</div>;
  }

  return (
    <div className="flex h-full space-x-4 pb-4">
      {columns?.map((column) => (
        <KanbanColumn key={column.id} column={column} />
      ))}
    </div>
  );
}
