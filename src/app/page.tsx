import { Header } from "@/components/header";
import { KanbanBoard } from "@/components/kanban-board";
import { Sidebar } from "@/components/sidebar";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function JobTrackerPage() {
  const supabase = await createClient();
  const { data: columns } = await supabase.from("columns").select("*,jobs(*)");

  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-x-auto p-4">
          <KanbanBoard />
        </main>
      </div>
    </div>
  );
}
