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

interface NameFieldProps {
  form: UseFormReturn<UserSchemaType>;
}

export const NameField = ({ form }: NameFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem className="grow">
          <FormLabel>Imię*</FormLabel>
          <FormControl>
            <Input {...field} className="border-slate-500 capitalize" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
