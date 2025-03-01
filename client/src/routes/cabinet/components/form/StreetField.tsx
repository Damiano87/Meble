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

interface StreetFieldProps {
  form: UseFormReturn<UserSchemaType>;
}

export const StreetField = ({ form }: StreetFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="street"
      render={({ field }) => (
        <FormItem className="grow">
          <FormLabel>Ulica*</FormLabel>
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
