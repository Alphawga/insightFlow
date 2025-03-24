import { AdminHeader } from "@/components/admin/admin-header"
import { AdminShell } from "@/components/admin/admin-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, ChevronDown, Download, Filter, MoreHorizontal, Plus, Search } from "lucide-react"

export default function AdminUsersPage() {
  return (
    <AdminShell>
      <AdminHeader heading="User Management" text="View and manage all platform users">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </AdminHeader>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-8" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Status</DropdownMenuItem>
                <DropdownMenuItem>Role</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuItem>Join Date</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                  <div className="flex items-center space-x-1">
                    <span>User</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1">
                    <span>Email</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1">
                    <span>Role</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1">
                    <span>Subscription</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1">
                    <span>Joined</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.company}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.role === "Admin" ? "destructive" : user.role === "Manager" ? "default" : "secondary"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : user.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </div>
                  </TableCell>
                  <TableCell>{user.subscription}</TableCell>
                  <TableCell>{user.joinedDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit user</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Reset password</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Suspend user</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminShell>
  )
}

const users = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Admin",
    status: "Active",
    subscription: "Professional",
    company: "Acme Inc.",
    joinedDate: "Jan 12, 2023",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "User",
    status: "Active",
    subscription: "Professional",
    company: "Globex Corp",
    joinedDate: "Feb 4, 2023",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Manager",
    status: "Active",
    subscription: "Enterprise",
    company: "Initech",
    joinedDate: "Mar 15, 2023",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "User",
    status: "Pending",
    subscription: "Basic",
    company: "Massive Dynamic",
    joinedDate: "Apr 22, 2023",
  },
  {
    id: "5",
    name: "Jessica Patel",
    email: "jessica@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "User",
    status: "Active",
    subscription: "Professional",
    company: "Stark Industries",
    joinedDate: "May 8, 2023",
  },
  {
    id: "6",
    name: "Robert Wilson",
    email: "robert@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "User",
    status: "Inactive",
    subscription: "Basic",
    company: "Wayne Enterprises",
    joinedDate: "Jun 14, 2023",
  },
  {
    id: "7",
    name: "Lisa Thompson",
    email: "lisa@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Manager",
    status: "Active",
    subscription: "Professional",
    company: "Umbrella Corp",
    joinedDate: "Jul 3, 2023",
  },
]

