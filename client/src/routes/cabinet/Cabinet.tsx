import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userSchema, UserSchemaType } from "@/schemas/userSchema";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/hooks/auth/useAuth";
import { EmailField } from "./components/form/EmailField";
import { CompanyField } from "./components/form/CompanyField";
import { NIPField } from "./components/form/NIPField";
import { NameField } from "./components/form/NameField";
import { LastNameField } from "./components/form/LastNameField";
import { SecEmailField } from "./components/form/SecEmailField";
import { StreetField } from "./components/form/StreetField";
import { ApartmentNrField } from "./components/form/ApartmentNrField";
import { CountryField } from "./components/form/CountryField";
import { PostalCodeField } from "./components/form/PostalCodeField";
import { CityField } from "./components/form/CityField";
import { PhoneField } from "./components/form/PhoneField";
import SecondPhoneField from "./components/form/SecondPhoneField";
import { useState } from "react";
import SubmitFormBtn from "./components/form/SubmitFormBtn";
import { useUpdateUserDelivery } from "@/hooks/users/useUpdateUserDelivery";
import PasswordChange from "./components/PasswordChange/PasswordChange";

const Cabinet = () => {
  const { username, email } = useAuth();
  const [selectedCountry1, setSelectedCountry1] = useState<string>("48");
  const [selectedCountry2, setSelectedCountry2] = useState<string>("48");
  const { updateUserInfoForDelivery, isPending } = useUpdateUserDelivery();

  // handle country code change
  const handleCountryCodeChange1 = (countryCode: string) => {
    setSelectedCountry1(countryCode);
  };

  const handleCountryCodeChange2 = (countryCode: string) => {
    setSelectedCountry2(countryCode);
  };

  // hook form
  const form = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: email || "",
      email2: email || "",
      country: "Polska",
      name: username || "",
    },
  });

  function onSubmit(values: UserSchemaType) {
    // concat country code with phone number
    const firstNumber = selectedCountry1 + values.phone;
    const secondNumber = values.phone2
      ? selectedCountry2 + values.phone2
      : null;

    // remove phone and phone2 from values
    const { phone, phone2, ...newValues } = values;
    void phone;
    void phone2;

    // create an array of phone numbers
    const phoneNumbers = [firstNumber, secondNumber].filter(Boolean);

    // create data object with phoneNumbers array and the rest of the values
    const data = { ...newValues, phoneNumbers };

    // update user info for delivery
    updateUserInfoForDelivery(data);
  }

  return (
    <div className="pt-40 max-w-5xl mx-auto px-4 grid grid-cols-2">
      <div>
        <h1 className="text-2xl font-semibold mb-6">Moje dane</h1>
        <PasswordChange />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <EmailField form={form} />
            <h2 className="text-xl font-semibold">Dane do faktury VAT:</h2>
            <CompanyField form={form} />
            <NIPField form={form} />
            <div className="flex items-start gap-4">
              <NameField form={form} />
              <LastNameField form={form} />
            </div>
            <SecEmailField form={form} />
            <div className="flex items-start gap-4">
              <StreetField form={form} />
              <ApartmentNrField form={form} />
            </div>
            <CountryField form={form} />
            <div className="flex items-start gap-4">
              <PostalCodeField form={form} />
              <CityField form={form} />
            </div>
            <PhoneField
              form={form}
              name={"phone"}
              state={selectedCountry1}
              handleCountryCodeChange={handleCountryCodeChange1}
            />
            <SecondPhoneField
              form={form}
              state={selectedCountry2}
              handleCountryCodeChange={handleCountryCodeChange2}
            />
            <SubmitFormBtn isPending={isPending} />
          </form>
        </Form>
      </div>
    </div>
  );
};
export default Cabinet;
