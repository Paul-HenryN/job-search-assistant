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

type NewJobContextType = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const NewJobFormContext = createContext<NewJobContextType>({
  isOpen: false,
  setOpen: () => {},
});

export function NewJobFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <NewJobFormContext.Provider value={{ isOpen, setOpen }}>
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
            <NewJobForm />
          </div>
        </DrawerContent>
      </Drawer>
    </NewJobFormContext.Provider>
  );
}

export function useNewJobForm() {
  return useContext(NewJobFormContext);
}
