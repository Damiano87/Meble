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

interface CityFieldProps {
  form: UseFormReturn<UserSchemaType>;
}

export const CityField = ({ form }: CityFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="city"
      render={({ field }) => (
        <FormItem className="grow">
          <FormLabel>Miasto*</FormLabel>
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
