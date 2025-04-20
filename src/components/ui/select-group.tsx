import { HTMLProps } from "react";
import { Select } from "./select";
import { cn } from "@/lib/utils";

interface SelectGroupProps extends HTMLProps<HTMLSelectElement> {
  label: string;
}

export function SelectGroup({
  className,
  id,
  label,
  ...rest
}: SelectGroupProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id}>{label}</label>
      <Select id={id} {...rest} />
    </div>
  );
}
