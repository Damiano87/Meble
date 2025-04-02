import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userSchema, UserSchemaType } from "@/schemas/userSchema";
import { useUpdateUserDelivery } from "@/hooks/users/useUpdateUserDelivery";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth/useAuth";
import { Form } from "@/components/ui/form";
import { CompanyField } from "./CompanyField";
import { NIPField } from "./NIPField";
import { NameField } from "./NameField";
import { LastNameField } from "./LastNameField";
import { EmailField } from "./EmailField";
import { StreetField } from "./StreetField";
import { ApartmentNrField } from "./ApartmentNrField";
import { CountryField } from "./CountryField";
import { PostalCodeField } from "./PostalCodeField";
import { CityField } from "./CityField";
import { PhoneField } from "./PhoneField";
import SecondPhoneField from "./SecondPhoneField";
import SubmitFormBtn from "./SubmitFormBtn";
import { Toaster } from "react-hot-toast";
import { useCheckout } from "@/hooks/stripe/useCheckout";
import { useGetCartItems } from "@/hooks/cart/useGetCartItems";
import { useGetUser } from "@/hooks/users/useGetUser";
import LoadingIndicator from "@/components/LoadingIndicator";

const UserForm = ({ withCheckout }: { withCheckout?: boolean }) => {
  const { username, email } = useAuth();
  const { user, isFetchingUser } = useGetUser();
  const { updateUserInfoForDelivery, isPending } = useUpdateUserDelivery();
  const { checkout } = useCheckout();
  const { data: cartItems } = useGetCartItems();

  // dial numbers
  const dialNumber1 = user?.phoneNumbers[0]?.slice(0, 2);
  const dialNumber2 = user?.phoneNumbers[1]?.slice(0, 2);

  // phone numbers
  const phoneNumber1 = user?.phoneNumbers[0]?.slice(2);
  const phoneNumber2 = user?.phoneNumbers[1]?.slice(2);

  const [selectedCountry1, setSelectedCountry1] = useState<string>(
    dialNumber1 || "48"
  );
  const [selectedCountry2, setSelectedCountry2] = useState<string>(
    dialNumber2 || "48"
  );

  // hook form
  const form = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: email || "",
      country: user?.country || "Polska",
      name: username || "",
      lastName: user?.lastName || "",
      company: user?.company || "",
      NIP: user?.NIP || "",
      apartmentNr: user?.apartmentNr || "",
      city: user?.city || "",
      postalCode: user?.postalCode || "",
      street: user?.street || "",
      phone: phoneNumber1 || "",
      phone2: phoneNumber2 || "",
    },
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  // reset form if user or form changes
  useEffect(() => {
    if (user) {
      form.reset({
        ...form.getValues(),
        company: user.company || "",
        NIP: user.NIP || "",
        apartmentNr: user.apartmentNr || "",
        city: user.city || "",
        country: user.country || "Polska",
        lastName: user.lastName || "",
        postalCode: user.postalCode || "",
        street: user.street || "",
        phone: phoneNumber1 || "",
        phone2: phoneNumber2 || "",
      });
    }
  }, [user, form, phoneNumber1, phoneNumber2]);

  // handle country code change
  const handleCountryCodeChange1 = (countryCode: string) => {
    setSelectedCountry1(countryCode);
  };

  const handleCountryCodeChange2 = (countryCode: string) => {
    setSelectedCountry2(countryCode);
  };

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

  // update user delivery data and redirect to stripe payment
  const updateDeliveryDataAndRedirectToPayment = (values: UserSchemaType) => {
    onSubmit(values);
    setTimeout(
      () =>
        checkout({
          cartItems: cartItems ? cartItems : [],
        }),
      2000
    );
  };

  if (isFetchingUser) {
    return (
      <div className="h-screen">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <Form {...form}>
      <Toaster />
      <form
        onSubmit={form.handleSubmit(
          withCheckout ? updateDeliveryDataAndRedirectToPayment : onSubmit
        )}
        className="space-y-6"
      >
        <h2 className="text-xl font-semibold">Dane do faktury VAT:</h2>
        <CompanyField form={form} />
        <NIPField form={form} />
        <div className="flex items-start gap-4">
          <NameField form={form} />
          <LastNameField form={form} />
        </div>
        <EmailField form={form} />
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
        <SubmitFormBtn isPending={isPending} withCheckout={withCheckout} />
      </form>
    </Form>
  );
};
export default UserForm;
