"use client";
import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { InputGroup } from "./ui/input-group";
import { TextareaGroup } from "./ui/textarea-group";
import { createJob } from "@/actions/jobs";
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
import { Column } from "@/types";
import { Input } from "./ui/input";
import { useState } from "react";

export function NewJobForm({
  defaultColumnId,
}: {
  defaultColumnId?: Column["id"];
}) {
  const { data: columns, isLoading } = useColumns();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: createJob,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["columns"],
      }),
  });

  const handleSubmit = async (formData: FormData) => {
    mutateAsync(formData);
  };

  const [selectedColumnId, setSelectedColumnId] = useState<
    Column["id"] | undefined
  >(defaultColumnId);

  const selectedColumn = columns?.find((c) => c.id === selectedColumnId);

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <InputGroup
        id="title"
        label="Job Title"
        name="title"
        disabled={isLoading}
        required
      />
      <InputGroup
        id="company"
        label="Company"
        name="company"
        disabled={isLoading}
        required
      />
      <TextareaGroup
        id="description"
        label="Job Description"
        name="description"
        rows={10}
        disabled={isLoading}
        required
      />

      <div className="flex flex-col gap-2">
        <label>Column</label>

        <Select
          name="column_id"
          disabled={isLoading}
          defaultValue={defaultColumnId?.toString()}
          onValueChange={(value) => setSelectedColumnId(Number(value))}
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

      <Input
        type="number"
        name="order"
        hidden
        readOnly
        value={selectedColumn?.jobs.length}
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        <PlusIcon className="mr-2 h-4 w-4" />
        Add Job
      </Button>
    </form>
  );
}
