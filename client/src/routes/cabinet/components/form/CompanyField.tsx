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

interface CompanyFieldProps {
  form: UseFormReturn<UserSchemaType>;
}

export const CompanyField = ({ form }: CompanyFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="company"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Firma</FormLabel>
          <FormControl>
            <Input
              {...field}
              value={field.value || ""}
              className="border-slate-500"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
