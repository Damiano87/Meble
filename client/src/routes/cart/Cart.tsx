import { Helmet } from "react-helmet-async";
import CartList from "./components/CartList";
import RemoveAll from "./components/RemoveAll";
import Summary from "./components/Summary";
import Title from "./components/Title";
import { useGetCartItems } from "@/hooks/useGetCartItems";
import LoadingIndicator from "@/components/LoadingIndicator";

const Cart = () => {
  const { data: cartItems, isPending } = useGetCartItems();

  if (isPending) return <LoadingIndicator />;

  return (
    <div className="pt-[8rem] max-w-7xl mx-auto px-4 mb-40">
      <Helmet>
        <title>Koszyk | H Meble</title>
        <meta
          name="description"
          content="Sprawdź zawartość koszyka. Przeglądaj wybrane produkty, dostosuj ilości i usuń niepotrzebne przedmioty. Gotowy do zakupu? Przejdź do podsumowania zamówienia."
        />
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">Koszyk</h1>
      {Array.isArray(cartItems) && cartItems.length === 0 ? (
        <h1 className="text-2xl mt-14">Twój koszyk jest pusty</h1>
      ) : (
        <>
          <Title />
          <CartList cartItems={cartItems} />
          <Summary cartItems={cartItems} />
          <RemoveAll />
        </>
      )}
    </div>
  );
};
export default Cart;
