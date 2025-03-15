"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Eye, EyeOff, MoreHorizontal, RefreshCw, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"

interface ApiKey {
  id: string;
  name: string;
  created: string;
  lastUsed: string;
  status: "Active" | "Revoked";
}

export function ApiKeysTable() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialApiKeys)
  const [visibleKeys, setVisibleKeys] = useState<string[]>([])

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys((prev) => (prev.includes(id) ? prev.filter((keyId) => keyId !== id) : [...prev, id]))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "API key copied",
      description: "The API key has been copied to your clipboard.",
    })
  }

  const revokeKey = (id: string) => {
    setApiKeys((prev) => prev.filter((key) => key.id !== id))
    toast({
      title: "API key revoked",
      description: "The API key has been permanently revoked.",
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Key</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last Used</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiKeys.map((key) => (
            <TableRow key={key.id}>
              <TableCell className="font-medium">{key.name}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">
                    {visibleKeys.includes(key.id) ? key.id : "••••••••••••••••••••••"}
                  </code>
                  <Button variant="ghost" size="icon" onClick={() => toggleKeyVisibility(key.id)}>
                    {visibleKeys.includes(key.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">Toggle visibility</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => copyToClipboard(key.id)}>
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
              </TableCell>
              <TableCell>{key.created}</TableCell>
              <TableCell>{key.lastUsed}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    key.status === "Active"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }
                >
                  {key.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => copyToClipboard(key.id)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Regenerate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={() => revokeKey(key.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Revoke
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const initialApiKeys: ApiKey[] = [
  // It's insecure to hardcode API keys.
  // These should be fetched from a secure source or environment variables.
  // Example structure:
  // {
  //   id: "some-unique-id-1",
  //   name: "Production Key",
  //   created: "Jul 20, 2024",
  //   lastUsed: "Never",
  //   status: "Active",
  // },
  // {
  //   id: "some-unique-id-2",
  //   name: "Development Key",
  //   created: "Jul 19, 2024",
  //   lastUsed: "1 hour ago",
  //   status: "Active",
  // }
]

