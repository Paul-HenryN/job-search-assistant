import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Job } from "@/types";
import { ComponentProps, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface JobCardProps extends ComponentProps<typeof Card> {
  job: Job;
}

export const JobCard = forwardRef<HTMLDivElement, JobCardProps>(
  ({ className, children, job, ...rest }: JobCardProps, ref) => {
    return (
      <Card
        className={cn("cursor-pointer hover:shadow-md py-3 gap-3", className)}
        ref={ref}
        {...rest}
      >
        <CardContent className="px-3">
          <h3 className="font-semibold mb-2">{job.title}</h3>

          <div className="flex items-center gap-2">
            <Avatar className="size-5">
              <AvatarImage src={""} />
              <AvatarFallback className="bg-blue-400 text-white">
                {job.company.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p>{job.company}</p>
          </div>
        </CardContent>

        <CardFooter className="text-xs">
          <time className="ml-auto">{job.created_at}</time>
        </CardFooter>
      </Card>
    );
  }
);
