import { KanbanColumn } from "./kanban-column"

// Sample data for the kanban board
const columns = [
  {
    id: "wishlist",
    title: "Wishlist",
    count: 3,
    jobs: [
      {
        id: "job1",
        company: "TechCorp",
        position: "Frontend Developer",
        location: "San Francisco, CA",
        salary: "$120,000 - $150,000",
        date: "2 days ago",
        logo: "/placeholder.svg?height=40&width=40",
        color: "bg-blue-500",
      },
      {
        id: "job2",
        company: "InnovateSoft",
        position: "UX Designer",
        location: "Remote",
        salary: "$90,000 - $110,000",
        date: "3 days ago",
        logo: "/placeholder.svg?height=40&width=40",
        color: "bg-purple-500",
      },
      {
        id: "job3",
        company: "DataSystems",
        position: "Data Analyst",
        location: "New York, NY",
        salary: "$85,000 - $105,000",
        date: "1 week ago",
        logo: "/placeholder.svg?height=40&width=40",
        color: "bg-green-500",
      },
    ],
  },
  {
    id: "applied",
    title: "Applied",
    count: 4,
    jobs: [
      {
        id: "job4",
        company: "CloudNine",
        position: "Full Stack Developer",
        location: "Austin, TX",
        salary: "$130,000 - $160,000",
        date: "Applied on Apr 10",
        logo: "/placeholder.svg?height=40&width=40",
        color: "bg-indigo-500",
      },
      {
        id: "job5",
        company: "Quantum Solutions",
        position: "DevOps Engineer",
        location: "Seattle, WA",
        salary: "$140,000 - $170,000",
        date: "Applied on Apr 8",
        logo: "/placeholder.svg?height=40&width=40",
        color: "bg-red-500",
      },
      {
        id: "job6",
        company: "EcoTech",
        position: "Product Manager",
        location: "Portland, OR",
        salary: "$110,000 - $140,000",
        date: "Applied on Apr 5",
        logo: "/placeholder.svg?height=40&width=40",
        color: "bg-yellow-500",
      },
      {
        id: "job7",
        company: "FinanceAI",
        position: "Machine Learning Engineer",
        location: "Chicago, IL",
        salary: "$150,000 - $180,000",
        date: "Applied on Apr 2",
        logo: "/placeholder.svg?height=40&width=40",
        color: "bg-teal-500",
      },
    ],
  },
  {
    id: "interview",
    title: "Interview",
    count: 2,
    jobs: [
      {
        id: "job8",
        company: "HealthTech",
        position: "Backend Developer",
        location: "Boston, MA",
        salary: "$125,000 - $155,000",
        date: "Interview on Apr 20",
        logo: "/placeholder.svg?height=40&width=40",
        color: "bg-pink-500",
      },
      {
        id: "job9",
        company: "EdTech Innovations",
        position: "Software Engineer",
        location: "Denver, CO",
        salary: "$115,000 - $145,000",
        date: "Interview on Apr 22",
        logo: "/placeholder.svg?height=40&width=40",
        color: "bg-orange-500",
      },
    ],
  },
  {
    id: "offer",
    title: "Offer",
    count: 1,
    jobs: [
      {
        id: "job10",
        company: "GreenEnergy",
        position: "Senior Frontend Developer",
        location: "San Diego, CA",
        salary: "$160,000 - $190,000",
        date: "Offer received Apr 15",
        logo: "/placeholder.svg?height=40&width=40",
        color: "bg-emerald-500",
      },
    ],
  },
  {
    id: "rejected",
    title: "Rejected",
    count: 2,
    jobs: [
      {
        id: "job11",
        company: "MobileTech",
        position: "Mobile Developer",
        location: "Miami, FL",
        salary: "$100,000 - $130,000",
        date: "Rejected on Apr 12",
        logo: "/placeholder.svg?height=40&width=40",
        color: "bg-gray-500",
      },
      {
        id: "job12",
        company: "SecuritySystems",
        position: "Security Engineer",
        location: "Washington, DC",
        salary: "$135,000 - $165,000",
        date: "Rejected on Apr 5",
        logo: "/placeholder.svg?height=40&width=40",
        color: "bg-gray-500",
      },
    ],
  },
]

export function KanbanBoard() {
  return (
    <div className="flex h-full space-x-4 pb-4">
      {columns.map((column) => (
        <KanbanColumn key={column.id} column={column} />
      ))}
    </div>
  )
}
