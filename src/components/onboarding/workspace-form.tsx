import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
  import { trpc } from '@/app/_providers/trpc-provider';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface WorkspaceFormProps {
  onComplete: () => void;
}

export function WorkspaceForm({ onComplete }: WorkspaceFormProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const createWorkspace = trpc.create.useMutation({
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
    <motion.form 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      onSubmit={handleSubmit} 
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Workspace Name</Label>
        <Input
          id="name"
          placeholder="My Agency"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="focus:border-orange-500 focus:ring-orange-500"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <div className="pt-2 text-right">
        <Button 
          type="submit" 
          disabled={createWorkspace.isLoading}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
        >
          {createWorkspace.isLoading ? 'Creating...' : 'Create Workspace'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.form>
  );
} 