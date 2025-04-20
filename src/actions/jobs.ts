"use server";

import { createClient } from "@/lib/supabase/server";

export async function createJob(formData: FormData) {
  const supabase = await createClient();

  console.log("formData", formData);

  const { error } = await supabase.from("jobs").insert({
    title: formData.get("title"),
    company: formData.get("company"),
    description: formData.get("description"),
    column_id: Number(formData.get("column_id")),
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateJobStatus({
  jobId,
  newColumnId,
}: {
  jobId: number;
  newColumnId: number;
}) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("jobs")
    .update({ column_id: newColumnId })
    .eq("id", jobId);

  if (error) {
    console.error("error", error);
    throw new Error(error.message);
  }
}
