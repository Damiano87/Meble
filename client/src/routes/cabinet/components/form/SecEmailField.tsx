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

interface SecEmailFieldProps {
  form: UseFormReturn<UserSchemaType>;
}

export const SecEmailField = ({ form }: SecEmailFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="email2"
      render={({ field }) => (
        <FormItem>
          <FormLabel>E-mail*</FormLabel>
          <FormControl>
            <Input {...field} className="border-slate-500" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
