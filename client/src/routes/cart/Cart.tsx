import { Helmet } from "react-helmet-async";
import CartList from "./components/CartList";
import RemoveAll from "./components/RemoveAll";
import Summary from "./components/Summary";
import Title from "./components/Title";
import { useGetCartItems } from "@/hooks/useGetCartItems";
import LoadingIndicator from "@/components/LoadingIndicator";

const Cart = () => {
  const { data: cartItems, isPending, error } = useGetCartItems();

  if (isPending) return <LoadingIndicator />;

  console.log(cartItems);

  return (
    <div className="pt-[8rem] max-w-7xl mx-auto px-4">
      <Helmet>
        <title>Koszyk | H Meble</title>
        <meta
          name="description"
          content="Sprawdź zawartość koszyka. Przeglądaj wybrane produkty, dostosuj ilości i usuń niepotrzebne przedmioty. Gotowy do zakupu? Przejdź do podsumowania zamówienia."
        />
      </Helmet>
      <Title />
      <CartList cartItems={cartItems} />
      <Summary />
      <RemoveAll />
    </div>
  );
};
export default Cart;
