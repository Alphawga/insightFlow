'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { trpc } from '@/app/_providers/trpc-provider';
import { Loader2 } from 'lucide-react';

const goals = [
  { id: 'increase_revenue', label: 'Increase overall revenue' },
  { id: 'improve_profit', label: 'Improve profit margins' },
  { id: 'grow_audience', label: 'Grow my audience / email list' },
  { id: 'optimize_ads', label: 'Optimize advertising spend (ROAS)' },
  { id: 'understand_traffic', label: 'Better understand website traffic sources' },
  { id: 'reduce_churn', label: 'Reduce customer churn (for SaaS/Subscription)' },
  { id: 'other', label: "Other (we'll focus on core metrics)" },
];

const formSchema = z.object({
  selectedGoals: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one goal.",
  }),
});

type GoalsFormValues = z.infer<typeof formSchema>;

interface GoalsFormProps {
  onComplete: () => void;
}

export function GoalsForm({ onComplete }: GoalsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: Replace with actual mutation to save goals
  // const saveGoals = trpc.saveUserGoals.useMutation({
  //   onSuccess: () => {
  //     onComplete();
  //   },
  //   onError: (error) => {
  //     setError(error.message);
  //     setIsLoading(false);
  //   },
  // });

  const form = useForm<GoalsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedGoals: [],
    },
  });

  async function onSubmit(data: GoalsFormValues) {
    setIsLoading(true);
    setError(null);
    console.log('Saving goals:', data.selectedGoals);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    // Replace with actual API call
    // saveGoals.mutate({ goals: data.selectedGoals });

    // TEMP: Assume success until mutation is implemented
    setIsLoading(false);
    onComplete();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="selectedGoals"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">What are your primary goals right now?</FormLabel>
                <FormDescription>
                  Select up to 3 goals that are most important for your business currently.
                </FormDescription>
              </div>
              {goals.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="selectedGoals"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 transition-colors hover:bg-accent hover:text-accent-foreground data-[state=checked]:bg-primary/10 data-[state=checked]:border-primary"
                        data-state={field.value?.includes(item.id) ? "checked" : "unchecked"}
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              const currentValues = field.value || [];
                              let newValues: string[];

                              if (checked) {
                                newValues = [...currentValues, item.id];
                                // Limit to 3 selections
                                if (newValues.length > 3) {
                                  newValues.shift(); // Remove the oldest selection
                                }
                              } else {
                                newValues = currentValues.filter(
                                  (value) => value !== item.id
                                );
                              }
                              field.onChange(newValues);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-sm font-medium text-destructive">{error}</p>}
        <Button type="submit" disabled={isLoading} className="w-full">
           {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Continue
        </Button>
      </form>
    </Form>
  );
} 