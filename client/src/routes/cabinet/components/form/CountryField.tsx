import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UseFormReturn } from "react-hook-form";
import { UserSchemaType } from "@/schemas/userSchema";

interface StreetFieldProps {
  form: UseFormReturn<UserSchemaType>;
}

const defaultCountry = "Polska";

export const CountryField = ({ form }: StreetFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="country"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Kraj*</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={defaultCountry}>
            <FormControl>
              <SelectTrigger className="border-slate-500">
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Polska">Polska</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
