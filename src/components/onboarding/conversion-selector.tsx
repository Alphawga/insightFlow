import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { trpc } from '@/app/_providers/trpc-provider';

interface ConversionSelectorProps {
  onComplete: () => void;
}

export function ConversionSelector({ onComplete }: ConversionSelectorProps) {
  const [selectedConversion, setSelectedConversion] = useState('');
  const [error, setError] = useState('');


  const workspaceId = localStorage.getItem('onboarding_workspace_id');


  const { data: adAccount, isLoading: isLoadingAccount } = trpc.getConnectedAccount.useQuery(
    { workspaceId: workspaceId! },
    { enabled: !!workspaceId }
  );

  const { data: conversionActions, isLoading: isLoadingConversions } = trpc.getConversionActions.useQuery(
    { adAccountId: adAccount?.id! },
    { enabled: !!adAccount?.id }
  );

  const setPrimaryConversion = trpc.setPrimaryConversion.useMutation({
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center p-6"
      >
        <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
        <span className="ml-2">Loading conversion actions...</span>
      </motion.div>
    );
  }

  if (!conversionActions?.conversionActions.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <p className="text-muted-foreground">
          No conversion actions found. You can set this up later in the settings.
        </p>
        <Button 
          onClick={onComplete}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.form 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit} 
      className="space-y-6"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Select Primary Conversion Action
        </label>
        <Select
          value={selectedConversion}
          onValueChange={setSelectedConversion}
        >
          <SelectTrigger className="focus:ring-orange-500 focus:border-orange-500">
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
      <div className="pt-2 text-right">
        <Button
          type="submit"
          disabled={setPrimaryConversion.isLoading}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
        >
          {setPrimaryConversion.isLoading ? 'Saving...' : 'Save and Continue'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.form>
  );
} 