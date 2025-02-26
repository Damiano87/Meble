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

interface LastNameFieldProps {
  form: UseFormReturn<UserSchemaType>;
}

export const LastNameField = ({ form }: LastNameFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="lastName"
      render={({ field }) => (
        <FormItem className="grow">
          <FormLabel>Nazwisko*</FormLabel>
          <FormControl>
            <Input {...field} className="border-slate-500" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
