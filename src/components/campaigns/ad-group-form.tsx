import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/app/_providers/trpc-provider";
import { TargetingOptions } from "./targeting-options";
import { Separator } from "@/components/ui/separator";

const adGroupFormSchema = z.object({
  name: z.string().min(1, "Ad group name is required"),
  status: z.enum(["ENABLED", "PAUSED"]),
  cpcBid: z.number().min(0.01, "CPC bid must be greater than 0"),
  targeting: z.object({
    locations: z.array(z.string()).optional(),
    languages: z.array(z.string()).optional(),
    demographics: z.object({
      ageRanges: z.array(z.string()).optional(),
      genders: z.array(z.string()).optional(),
      parentalStatus: z.array(z.string()).optional(),
      householdIncome: z.array(z.string()).optional(),
    }).optional(),
    interests: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
  }).optional(),
  description: z.string().optional(),
});

type AdGroupFormValues = z.infer<typeof adGroupFormSchema>;

interface AdGroupFormProps {
  campaignId: string;
  adGroupId?: string;
  onSuccess?: () => void;
}

export function AdGroupForm({ campaignId, adGroupId, onSuccess }: AdGroupFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: adGroup } = trpc.getAdGroup.useQuery(
    { adGroupId: adGroupId! },
    { enabled: !!adGroupId }
  );

  const createAdGroup = trpc.createAdGroup.useMutation({
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const updateAdGroup = trpc.updateAdGroup.useMutation({
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const form = useForm<AdGroupFormValues>({
    resolver: zodResolver(adGroupFormSchema),
    defaultValues: adGroup || {
      status: "PAUSED",
      targeting: {
        locations: [],
        languages: [],
        demographics: {
          ageRanges: [],
          genders: [],
          parentalStatus: [],
          householdIncome: [],
        },
        interests: [],
        keywords: [],
      },
    },
  });

  const onSubmit = async (data: AdGroupFormValues) => {
    setIsSubmitting(true);
    try {
      if (adGroupId) {
        await updateAdGroup.mutateAsync({
          ...data,
          id: adGroupId,
        });
      } else {
        await createAdGroup.mutateAsync({
          ...data,
          campaignId,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ad Group Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ENABLED">Enabled</SelectItem>
                  <SelectItem value="PAUSED">Paused</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cpcBid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default CPC Bid</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Maximum cost-per-click bid for this ad group
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="my-4" />
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Targeting Options</h3>
          <FormField
            control={form.control}
            name="targeting"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TargetingOptions
                    value={field.value || {}}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onSuccess?.()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : adGroupId ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
} 