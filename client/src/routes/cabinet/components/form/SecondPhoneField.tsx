import { BsPlusLg } from "react-icons/bs";
import { TfiMinus } from "react-icons/tfi";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { UserSchemaType } from "../../../../schemas/userSchema";
import { PhoneField } from "./PhoneField";
import { Button } from "@/components/ui/button";

type FormProps = {
  form: UseFormReturn<UserSchemaType>;
  state: string;
  handleCountryCodeChange: (countryCode: string) => void;
};

const SecondPhoneField = ({
  form,
  state,
  handleCountryCodeChange,
}: FormProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <Button
        type="button"
        variant={"secondary"}
        className="p-0 m-0"
        onClick={() => setIsVisible((prev) => !prev)}
      >
        {isVisible ? <TfiMinus /> : <BsPlusLg />}
        <span>Numer telefonu</span>
      </Button>
      {isVisible && (
        <PhoneField
          form={form}
          state={state}
          handleCountryCodeChange={handleCountryCodeChange}
          name="phone2"
          className="hidden"
          labelClassName="hidden"
        />
      )}
    </div>
  );
};
export default SecondPhoneField;
