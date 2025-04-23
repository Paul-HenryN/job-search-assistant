"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signInWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: process.env.OAUTH_REDIRECT_URI,
    },
  });

  if (error) throw error;

  if (data.url) {
    redirect(data.url);
  }
}

export async function getUser() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) return null;

  return data.user;
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}
