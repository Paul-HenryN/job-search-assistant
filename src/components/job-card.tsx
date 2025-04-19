import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface JobProps {
  job: {
    id: string;
    company: string;
    position: string;
    location: string;
    salary: string;
    date: string;
    logo: string;
    color: string;
  };
}

export function JobCard({ job }: JobProps) {
  return (
    <Card className="cursor-pointer transition-all hover:shadow-md py-3 gap-3">
      <CardContent className="px-3">
        <h3 className="font-semibold mb-2">{job.position}</h3>

        <div className="flex items-center gap-2">
          <Avatar className="size-5">
            <AvatarImage src={job.logo} />
            <AvatarFallback className="bg-blue-400 text-white">
              {job.company.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p>{job.company}</p>
        </div>
      </CardContent>

      <CardFooter className="text-xs">
        <time className="ml-auto">{job.date}</time>
      </CardFooter>
    </Card>
  );
}
