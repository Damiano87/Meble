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

interface PostalCodeFieldProps {
  form: UseFormReturn<UserSchemaType>;
}

export const PostalCodeField = ({ form }: PostalCodeFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="postalCode"
      render={({ field }) => (
        <FormItem className="grow">
          <FormLabel>Kod pocztowy*</FormLabel>
          <FormControl>
            <Input
              {...field}
              value={field.value || ""}
              placeholder="NN-NNN"
              className="border-slate-500"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
