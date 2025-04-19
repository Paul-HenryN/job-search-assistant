import { HTMLProps } from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface InputGroupProps extends HTMLProps<HTMLInputElement> {
  label: string;
}

export function InputGroup({ className, id, label, ...rest }: InputGroupProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id}>{label}</label>
      <Input id={id} {...rest} />
    </div>
  );
}
