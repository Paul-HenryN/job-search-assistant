"use server";

import { createClient } from "@/lib/supabase/server";
import { Job } from "@/types";

export async function createJob(formData: FormData) {
  const supabase = await createClient();

  console.log("formData", formData);

  const { error } = await supabase.from("jobs").insert({
    title: formData.get("title"),
    company: formData.get("company"),
    description: formData.get("description"),
    column_id: Number(formData.get("column_id")),
    order: Number(formData.get("order")),
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateJob({
  jobId,
  payload,
}: {
  jobId: Job["id"];
  payload: Partial<Omit<Job, "id" | "created_at">>;
}) {
  const supabase = await createClient();

  const { error } = await supabase.from("jobs").update(payload).eq("id", jobId);

  if (error) {
    console.error("error", error);
    throw new Error(error.message);
  }
}
