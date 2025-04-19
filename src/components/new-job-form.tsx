import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { InputGroup } from "./ui/input-group";
import { TextareaGroup } from "./ui/textarea-group";

export function NewJobForm() {
  return (
    <form action="" className="flex flex-col gap-4">
      <InputGroup id="title" label="Job Title" name="title" />
      <InputGroup id="company" label="Company" name="company" />
      <TextareaGroup
        id="description"
        label="Job Description"
        name="description"
        rows={10}
      />

      <Button type="submit" className="w-full">
        <PlusIcon className="mr-2 h-4 w-4" />
        Add Job
      </Button>
    </form>
  );
}
