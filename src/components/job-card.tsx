import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Job } from "@/types";

interface JobProps {
  job: Job;
}

export function JobCard({ job }: JobProps) {
  return (
    <Card className="cursor-pointer transition-all hover:shadow-md py-3 gap-3">
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
