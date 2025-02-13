import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { api } from '@/lib/trpc/client';
import { Loader2 } from 'lucide-react';

interface ConversionSelectorProps {
  onComplete: () => void;
}

export function ConversionSelector({ onComplete }: ConversionSelectorProps) {
  const [selectedConversion, setSelectedConversion] = useState('');
  const [error, setError] = useState('');

  // Get the workspace ID we stored during workspace creation
  const workspaceId = localStorage.getItem('onboarding_workspace_id');

  // Get the connected ad account
  const { data: adAccount, isLoading: isLoadingAccount } = api.getConnectedAccount.useQuery(
    { workspaceId: workspaceId! },
    { enabled: !!workspaceId }
  );

  // Get conversion actions for the account
  const { data: conversionActions, isLoading: isLoadingConversions } = api.getConversionActions.useQuery(
    { adAccountId: adAccount?.id! },
    { enabled: !!adAccount?.id }
  );

  const setPrimaryConversion = api.setPrimaryConversion.useMutation({
    onSuccess: () => {
      onComplete();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConversion) {
      setError('Please select a conversion action');
      return;
    }
    if (adAccount?.id) {
      setPrimaryConversion.mutate({
        adAccountId: adAccount.id,
        conversionActionId: selectedConversion,
      });
    }
  };

  if (isLoadingAccount || isLoadingConversions) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading conversion actions...</span>
      </div>
    );
  }

  if (!conversionActions?.conversionActions.length) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">
          No conversion actions found. You can set this up later in the settings.
        </p>
        <Button onClick={onComplete} className="mt-4">
          Continue
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Select Primary Conversion Action
        </label>
        <Select
          value={selectedConversion}
          onValueChange={setSelectedConversion}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a conversion action" />
          </SelectTrigger>
          <SelectContent>
            {conversionActions?.conversionActions.map((conversion) => (
              <SelectItem key={conversion.id} value={conversion.id}>
                {conversion.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <Button
        type="submit"
        disabled={setPrimaryConversion.isLoading}
      >
        {setPrimaryConversion.isLoading ? 'Saving...' : 'Save and Continue'}
      </Button>
    </form>
  );
} 