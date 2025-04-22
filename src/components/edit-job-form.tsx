"use client";
import { PlusIcon, SaveIcon } from "lucide-react";
import { Button } from "./ui/button";
import { InputGroup } from "./ui/input-group";
import { TextareaGroup } from "./ui/textarea-group";
import { createJob, updateJob } from "@/actions/jobs";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "./ui/select";
import { useColumns } from "@/hooks/useColumns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Job } from "@/types";

export function EditJobForm({ job }: { job: Job }) {
  const { data: columns, isLoading } = useColumns();
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (formData: FormData) => {
      const payload = {
        title: formData.get("title")?.toString(),
        company: formData.get("company")?.toString(),
        description: formData.get("description")?.toString(),
        column_id: Number(formData.get("column_id")),
      };

      return updateJob({ jobId: job.id, payload });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["columns"],
      }),
  });

  return (
    <form action={mutateAsync} className="flex flex-col gap-4">
      <InputGroup
        id="title"
        label="Job Title"
        name="title"
        disabled={isLoading}
        defaultValue={job.title}
        required
      />
      <InputGroup
        id="company"
        label="Company"
        name="company"
        disabled={isLoading}
        defaultValue={job.company}
        required
      />
      <TextareaGroup
        id="description"
        label="Job Description"
        name="description"
        rows={10}
        disabled={isLoading}
        defaultValue={job.description}
        required
      />

      <div className="flex flex-col gap-2">
        <label>Column</label>

        <Select
          name="column_id"
          disabled={isLoading}
          defaultValue={job.column_id.toString()}
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Column" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {columns?.map((column) => (
                <SelectItem key={column.id} value={column.id.toString()}>
                  {column.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading || isPending}
      >
        {isPending ? (
          "Saving..."
        ) : (
          <>
            {" "}
            <SaveIcon />
            Save
          </>
        )}
      </Button>
    </form>
  );
}
