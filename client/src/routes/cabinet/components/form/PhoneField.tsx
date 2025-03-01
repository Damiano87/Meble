import { TfiClose } from "react-icons/tfi";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { UserSchemaType } from "@/schemas/userSchema";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useClickAway } from "react-use";
import { cn } from "@/lib/utils";

interface PhoneFieldProps {
  form: UseFormReturn<UserSchemaType>;
  name: "phone" | "phone2";
  state: string;
  handleCountryCodeChange: (countryCode: string) => void;
  className?: string;
  labelClassName?: string;
}

const countries = [
  { num: "48", country: "Polska" },
  { num: "49", country: "Niemcy" },
  { num: "44", country: "Wielka Brytania" },
  { num: "45", country: "Dania" },
  { num: "46", country: "Szwecja" },
  { num: "47", country: "Norwegia" },
  { num: "41", country: "Szwajcaria" },
  { num: "420", country: "Czechy" },
  { num: "421", country: "Słowacja" },
  { num: "380", country: "Ukraina" },
  { num: "32", country: "Belgia" },
  { num: "33", country: "Francja" },
  { num: "34", country: "Hiszpania" },
  { num: "351", country: "Portugalia" },
  { num: "358", country: "Finlandia" },
  { num: "31", country: "Holandia" },
  { num: "353", country: "Irlandia" },
  { num: "354", country: "Islandia" },
  { num: "36", country: "Węgry" },
];

export const PhoneField = ({
  state,
  handleCountryCodeChange,
  name,
  form,
  className,
  labelClassName,
}: PhoneFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const setOpen = () => setIsOpen(true);
  const setClose = () => setIsOpen(false);

  return (
    <div>
      <div className={cn("font-semibold mb-1", labelClassName)}>
        Numer komórkowy:*
      </div>
      <div>
        <div className="flex items-stretch gap-4">
          <div
            className="flex items-center justify-center border border-slate-500 rounded-md px-4 cursor-default"
            onClick={setOpen}
          >
            +{state}
          </div>
          {/* input phone */}
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className="w-full">
                {/* select country */}
                <FormControl className="grow">
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder="123456789"
                    className="border border-slate-500"
                  />
                </FormControl>
                <FormMessage className="hidden" />
              </FormItem>
            )}
          />
        </div>

        <p className={cn(className)}>
          Numer telefonu jest niezbędny, aby zapewnić sprawną dostawę.
        </p>

        <div className="mt-1">
          <FormField
            control={form.control}
            name={name}
            render={() => <FormMessage />}
          />
        </div>

        {/* modal */}
        {isOpen && (
          <PhoneModal
            handleCountryCodeChange={handleCountryCodeChange}
            setClose={setClose}
          />
        )}
      </div>
    </div>
  );
};

type PhoneModalProps = {
  handleCountryCodeChange: (num: string) => void;
  setClose: () => void;
};

const PhoneModal = ({ handleCountryCodeChange, setClose }: PhoneModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const setPhoneNumber = (num: string): void => {
    handleCountryCodeChange(num);
    setClose();
  };

  useClickAway(ref, () => setClose());

  return (
    <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
      <div
        className="bg-white p-4 max-h-[30rem] w-[25rem] overflow-y-scroll"
        ref={ref}
      >
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold mb-5">Numer komórkowy*:</h2>
          <Button
            variant={"secondary"}
            title="Zamknij"
            className="[&_svg]:size-5 p-0"
            onClick={setClose}
          >
            <TfiClose />
          </Button>
        </div>
        <table className="w-full">
          <tbody>
            {countries.map((country) => (
              <tr
                key={country.num}
                className="cursor-pointer hover:bg-slate-100"
                onClick={(e) => {
                  e.stopPropagation();
                  setPhoneNumber(country.num);
                }}
              >
                <td className="w-24 p-1">+{country.num}</td>
                <td className="p-1">{country.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
