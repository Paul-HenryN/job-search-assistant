import { Column } from "@/types";
import { createClient } from "./server";

export async function getColumns() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("columns").select("*,jobs(*)");

  if (error) {
    throw new Error(error.message);
  }

  return data as Column[];
}
