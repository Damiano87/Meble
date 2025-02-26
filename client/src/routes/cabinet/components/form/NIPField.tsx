import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { UserSchemaType } from "@/schemas/userSchema";

interface NIPFieldProps {
  form: UseFormReturn<UserSchemaType>;
}

export const NIPField = ({ form }: NIPFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="NIP"
      render={({ field }) => (
        <FormItem>
          <FormLabel>NIP</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="NNNNNNNNNN"
              className="border-slate-500"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
