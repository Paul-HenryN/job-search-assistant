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

  console.log("error", error);
}
