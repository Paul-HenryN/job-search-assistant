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

export function NewJobForm() {
  return (
    <form action={createJob} className="flex flex-col gap-4">
      <InputGroup id="title" label="Job Title" name="title" required />
      <InputGroup id="company" label="Company" name="company" required />
      <TextareaGroup
        id="description"
        label="Job Description"
        name="description"
        rows={10}
        required
      />

      <div className="flex flex-col gap-2">
        <label>Column</label>

        <Select name="column_id" required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Column" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="1">Applied</SelectItem>
              <SelectItem value="2">Interviewing</SelectItem>
              <SelectItem value="3">Offer</SelectItem>
              <SelectItem value="4">Rejected</SelectItem>
              <SelectItem value="5">Accepted</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">
        <PlusIcon className="mr-2 h-4 w-4" />
        Add Job
      </Button>
    </form>
  );
}
