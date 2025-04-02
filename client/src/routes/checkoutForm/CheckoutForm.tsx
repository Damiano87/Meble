import MetaData from "@/components/Meta";
import UserForm from "../cabinet/components/form/UserForm";

const CheckoutForm = () => {
  return (
    <div className="pt-52 max-w-6xl mx-auto px-4 grid md:grid-cols-2">
      <MetaData title="H Meble | Checkout" content="Checkout" />
      <div>
        <h1 className="text-[1.6rem] font-semibold mb-10">
          Podaj dane do wysyłki
        </h1>
        <UserForm withCheckout />
      </div>
    </div>
  );
};
export default CheckoutForm;
