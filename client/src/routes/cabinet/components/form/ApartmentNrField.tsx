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

interface ApartmentNrFieldProps {
  form: UseFormReturn<UserSchemaType>;
}

export const ApartmentNrField = ({ form }: ApartmentNrFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="apartmentNr"
      render={({ field }) => (
        <FormItem className="grow">
          <FormLabel>Numer domu/mieszkania*</FormLabel>
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
