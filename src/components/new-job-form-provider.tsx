"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { NewJobForm } from "./new-job-form";
import { Column } from "@/types";

type NewJobContextType = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  defaultColumnId?: Column["id"];
  setDefaultColumnId: Dispatch<SetStateAction<Column["id"] | undefined>>;
};

const NewJobFormContext = createContext<NewJobContextType>({
  isOpen: false,
  setOpen: () => {},
  setDefaultColumnId: () => {},
});

export function NewJobFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setOpen] = useState(false);
  const [defaultColumnId, setDefaultColumnId] = useState<
    Column["id"] | undefined
  >();

  return (
    <NewJobFormContext.Provider
      value={{ isOpen, setOpen, defaultColumnId, setDefaultColumnId }}
    >
      {children}
      <Drawer open={isOpen} onOpenChange={setOpen} direction="right">
        <DrawerContent>
          <DrawerHeader className="flex flex-row items-center justify-between">
            <DrawerTitle>New Job</DrawerTitle>

            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <XIcon className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <div className="px-4 mt-8">
            <NewJobForm defaultColumnId={defaultColumnId} />
          </div>
        </DrawerContent>
      </Drawer>
    </NewJobFormContext.Provider>
  );
}

export function useNewJobForm() {
  return useContext(NewJobFormContext);
}
