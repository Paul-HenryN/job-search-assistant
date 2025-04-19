import { HTMLProps } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "./textarea";

interface TextareaGroupProps extends HTMLProps<HTMLTextAreaElement> {
  label: string;
}

export function TextareaGroup({
  className,
  id,
  label,
  ...rest
}: TextareaGroupProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id}>{label}</label>
      <Textarea id={id} {...rest} />
    </div>
  );
}
