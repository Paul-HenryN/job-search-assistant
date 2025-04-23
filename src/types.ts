import { User } from "@supabase/supabase-js";

export type Column = {
  id: number;
  name: string;
  jobs: Job[];
  created_at: string;
};

export type Job = {
  id: number;
  company: string;
  title: string;
  description: string;
  created_at: string;
  column_id: Column["id"];
  order: number;
  user_id: User["id"];
};
