"use client";
import { Bell, LogOutIcon, Plus, Search, UserIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNewJobForm } from "./new-job-form-provider";
import { signInWithGoogle } from "@/actions/auth";
import { useAuth } from "./auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export function Header() {
  const { setOpen } = useNewJobForm();
  const { user, logout } = useAuth();

  const UserInfo = () => {
    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex gap-2 items-center" variant="secondary">
              <Avatar className="size-6">
                <AvatarImage src={user.user_metadata.avatar_url} />
                <AvatarFallback>
                  {user.user_metadata.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              {user.user_metadata.name}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem onClick={logout}>
              <LogOutIcon /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Button size="sm" onClick={signInWithGoogle}>
        <UserIcon className="mr-2 size-4" />
        Login with Google
      </Button>
    );
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:bg-gray-800">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-xl font-bold">
          JobTrack
        </Link>
      </div>

      {user && (
        <div className="flex w-full max-w-sm items-center gap-2 px-4">
          <Search className="size-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search applications..."
            className="h-9 border-none bg-transparent shadow-none focus-visible:ring-0"
          />
        </div>
      )}

      <div className="flex gap-4 items-center">
        {user && (
          <>
            <Button variant="outline" size="icon">
              <Bell className="size-4" />
            </Button>

            <Button size="sm" onClick={() => setOpen(true)}>
              <Plus className="mr-2 size-4" />
              Add Job
            </Button>
          </>
        )}

        <UserInfo />
      </div>
    </header>
  );
}
