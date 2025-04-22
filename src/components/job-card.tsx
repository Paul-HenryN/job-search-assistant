import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Column, Job } from "@/types";
import { ComponentProps, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { PencilIcon, TrashIcon, XIcon } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { EditJobForm } from "./edit-job-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJob } from "@/actions/jobs";

interface JobCardProps extends ComponentProps<typeof Card> {
  job: Job;
}

export const JobCard = forwardRef<HTMLDivElement, JobCardProps>(
  ({ className, children, job, ...rest }: JobCardProps, ref) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
      mutationFn: deleteJob,
      onMutate: () => {
        queryClient.setQueryData<Column[]>(["columns"], (old) => {
          if (!old) return old;

          return old.map((c) => ({
            ...c,
            jobs: c.jobs.filter((j) => j.id !== job.id),
          }));
        });
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: ["columns"] }),
    });

    return (
      <div className="relative group">
        <div className="opacity-0 group-hover:opacity-100 items-center absolute top-2 right-2">
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button variant="ghost" title="edit" size="icon">
                <PencilIcon />
              </Button>
            </DrawerTrigger>

            <DrawerContent>
              <DrawerHeader className="flex-row justify-between items-center">
                <DrawerTitle>Edit job</DrawerTitle>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon">
                    <XIcon />
                  </Button>
                </DrawerClose>
              </DrawerHeader>

              <div className="px-4">
                <EditJobForm job={job} />
              </div>
            </DrawerContent>
          </Drawer>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" title="delete" size="icon">
                <TrashIcon />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this job.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => mutate(job.id)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

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
      </div>
    );
  }
);
