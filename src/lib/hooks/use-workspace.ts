'use client'

import { useState, useEffect } from 'react'
import { trpc } from '@/app/_providers/trpc-provider'

export function useWorkspace() {
  const [workspaceId, setWorkspaceId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { data: userWorkspace, isLoading: isLoadingWorkspace, isError } = 
    trpc.getUserWorkspace.useQuery(undefined, {
      retry: 1,
      retryDelay: 1000,
      onError: (err) => {
        console.error('Error fetching workspace:', err)
        setError(err.message)
      }
    })

  useEffect(() => {
    if (!isLoadingWorkspace) {
      setIsLoading(false)
      
      if (userWorkspace?.workspace) {
        setWorkspaceId(userWorkspace.workspace.id)
      } else if (!isError) {
        // If no error but no workspace, the user may need to create one
        setError('No workspace found. Please create one first.')
      }
    }
  }, [userWorkspace, isLoadingWorkspace, isError])

  return { 
    workspaceId, 
    workspace: userWorkspace?.workspace, 
    isLoading, 
    error
  }
} 