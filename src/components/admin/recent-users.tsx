import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

export function RecentUsers() {
  return (
    <div className="space-y-8">
      {users.map((user) => (
        <div key={user.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">{user.joinedDate}</div>
        </div>
      ))}
      <Button variant="outline" className="w-full" size="sm">
        View All Users
        <ArrowUpRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

const users = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    joinedDate: "2 hours ago",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    joinedDate: "5 hours ago",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    joinedDate: "1 day ago",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    joinedDate: "2 days ago",
  },
  {
    id: "5",
    name: "Jessica Patel",
    email: "jessica@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    joinedDate: "3 days ago",
  },
]

