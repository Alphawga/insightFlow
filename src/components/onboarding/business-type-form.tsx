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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { trpc } from '@/app/_providers/trpc-provider';
import { Loader2 } from 'lucide-react';

const businessTypes = [
  { value: 'ecommerce', label: 'E-commerce Store (e.g., Shopify, Etsy)' },
  { value: 'saas', label: 'SaaS / Software' },
  { value: 'service', label: 'Service-Based Business (e.g., Agency, Coaching)' },
  { value: 'creator', label: 'Creator / Influencer' },
  { value: 'local', label: 'Local Business' },
  { value: 'other', label: 'Other' },
];

const formSchema = z.object({
  businessType: z.string().min(1, { message: "Please select your business type." }),
});

type BusinessTypeFormValues = z.infer<typeof formSchema>;

interface BusinessTypeFormProps {
  onComplete: () => void;
}

export function BusinessTypeForm({ onComplete }: BusinessTypeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: Replace with actual mutation to save business type
  // Example using a dummy mutation
  // const saveBusinessType = trpc.saveUserBusinessType.useMutation({
  //   onSuccess: () => {
  //     onComplete();
  //   },
  //   onError: (error) => {
  //     setError(error.message);
  //     setIsLoading(false);
  //   },
  // });

  const form = useForm<BusinessTypeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessType: '',
    },
  });

  async function onSubmit(values: BusinessTypeFormValues) {
    setIsLoading(true);
    setError(null);
    console.log('Saving business type:', values.businessType);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    // Replace with actual API call
    // saveBusinessType.mutate({ businessType: values.businessType });
    
    // TEMP: Assume success until mutation is implemented
    setIsLoading(false);
    onComplete(); 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What type of business do you run?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary business type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                This helps us tailor insights to your needs.
              </FormDescription>
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