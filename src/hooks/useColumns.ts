import { getColumns } from "@/actions/jobs";
import { Column } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useColumns({ initial }: { initial?: Column[] } = {}) {
  return useQuery({
    queryKey: ["columns"],
    queryFn: getColumns,
    initialData: initial,
  });
}
