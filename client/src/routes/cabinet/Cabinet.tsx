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

const Cabinet = () => {
  const { email } = useAuth();

  // hook form
  const form = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {},
  });

  function onSubmit(values: UserSchemaType) {
    console.log(values);
  }

  return (
    <div className="pt-40 max-w-5xl mx-auto px-4 grid grid-cols-2">
      <div>
        <h1 className="text-2xl font-semibold mb-6">Moje dane</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <EmailField form={form} defaultEmail={email} />
            <h2 className="text-xl font-semibold">Dane do faktury VAT:</h2>
            <CompanyField form={form} />
            <NIPField form={form} />
            <div className="flex items-center gap-4">
              <NameField form={form} />
              <LastNameField form={form} />
            </div>
            <SecEmailField form={form} defaultEmail={email} />
            <div className="flex items-center gap-4">
              <StreetField form={form} />
              <ApartmentNrField form={form} />
            </div>
            <CountryField form={form} />
            <div className="flex items-center gap-4">
              <PostalCodeField form={form} />
              <CityField form={form} />
            </div>
            <PhoneField form={form} />
            {/* <Button type="submit" className="text-black">
            Submit
          </Button> */}
          </form>
        </Form>
      </div>
    </div>
  );
};
export default Cabinet;
