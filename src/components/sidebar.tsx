import { BarChart2, Briefcase, Calendar, Cog, Home, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-white p-4 dark:bg-gray-800">
      <div className="space-y-4">
        <div className="py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="#">
                <Home className="mr-2 h-4 w-4" />
                Overview
              </Link>
            </Button>
            <Button variant="secondary" className="w-full justify-start" asChild>
              <Link href="#">
                <Briefcase className="mr-2 h-4 w-4" />
                Applications
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="#">
                <Calendar className="mr-2 h-4 w-4" />
                Interviews
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="#">
                <BarChart2 className="mr-2 h-4 w-4" />
                Statistics
              </Link>
            </Button>
          </div>
        </div>
        <Separator />
        <div className="py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Tools</h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="#">
                <Users className="mr-2 h-4 w-4" />
                Contacts
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="#">
                <Cog className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
          <h3 className="font-medium">Application Summary</h3>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <div>Applied: 12</div>
            <div>Interviews: 5</div>
            <div>Offers: 2</div>
            <div>Rejected: 3</div>
          </div>
        </div>
      </div>
    </div>
  )
}
