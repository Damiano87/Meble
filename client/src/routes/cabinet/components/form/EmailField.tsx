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

interface EmailFieldProps {
  form: UseFormReturn<UserSchemaType>;
  defaultEmail?: string;
}

export const EmailField = ({ form, defaultEmail }: EmailFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>E-mail jako nazwa użytkownika:</FormLabel>
          <FormControl>
            <Input
              {...field}
              defaultValue={defaultEmail}
              className="border-slate-500"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
