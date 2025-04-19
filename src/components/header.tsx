import { Bell, Plus, Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:bg-gray-800">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-xl font-bold">
          JobTrack
        </Link>
      </div>
      <div className="flex w-full max-w-sm items-center gap-2 px-4">
        <Search className="h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search applications..."
          className="h-9 border-none bg-transparent shadow-none focus-visible:ring-0"
        />
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </Button>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Job
        </Button>
      </div>
    </header>
  )
}
