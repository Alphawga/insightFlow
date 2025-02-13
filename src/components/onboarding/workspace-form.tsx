import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/trpc/client';

interface WorkspaceFormProps {
  onComplete: () => void;
}

export function WorkspaceForm({ onComplete }: WorkspaceFormProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const createWorkspace = api.workspace.create.useMutation({
    onSuccess: (workspace) => {
      // Store workspace ID for Google Ads connection
      localStorage.setItem('onboarding_workspace_id', workspace.id);
      onComplete();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Workspace name is required');
      return;
    }
    createWorkspace.mutate({ name });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Workspace Name</Label>
        <Input
          id="name"
          placeholder="My Agency"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <Button type="submit" disabled={createWorkspace.isLoading}>
        {createWorkspace.isLoading ? 'Creating...' : 'Create Workspace'}
      </Button>
    </form>
  );
} 