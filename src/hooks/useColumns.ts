import { supabase } from "@/lib/supabase/client";
import { Column } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useColumns(initialData?: Column[]) {
  return useQuery({
    queryKey: ["columns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("columns")
        .select("*,jobs(*)");

      if (error) {
        throw new Error(error.message);
      }

      return data as Column[];
    },
    initialData,
  });
}
