import MetaData from "@/components/Meta";
import CartItemsList from "./components/CartItemsList";
import ShippingAddress from "./components/ShippingAddress";
import { useGetCartItems } from "@/hooks/cart/useGetCartItems";
import Summary from "../cart/components/Summary";

const OrderSummary = () => {
  const { data: cartItems } = useGetCartItems();

  return (
    <div className="pt-44 max-w-7xl mx-auto px-4">
      <MetaData
        title="H Meble | Podsumowanie zamówienia"
        content="Podsumowanie Twojego zamówienia"
      />
      <h1 className="text-[1.3rem] font-semibold mb-10">
        Podsumowanie zamówienia
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <CartItemsList cartItems={cartItems} />
        <ShippingAddress />
      </div>
      <Summary cartItems={cartItems} />
    </div>
  );
};
export default OrderSummary;
