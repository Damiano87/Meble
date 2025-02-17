import CartList from "./components/CartList";
import Summary from "./components/Summary";
import Title from "./components/Title";
import { useGetCartItems } from "@/hooks/useGetCartItems";
import LoadingIndicator from "@/components/LoadingIndicator";
import NotLogedIn from "@/components/AsideCart/NotLogedIn";
import MetaData from "@/components/Meta";
import { useAuth } from "@/hooks/useAuth";

const Cart = () => {
  const { username } = useAuth();
  const { data: cartItems, isPending } = useGetCartItems({
    enabled: !!username,
  });

  if (!cartItems)
    return (
      <div className="pt-[8rem] max-w-7xl mx-auto px-4 mb-40">
        <MetaData
          title="Koszyk | H Meble"
          content="Sprawdź zawartość koszyka. Przeglądaj wybrane produkty, dostosuj ilości i usuń niepotrzebne przedmioty. Gotowy do zakupu? Przejdź do podsumowania zamówienia."
        />
        <NotLogedIn />
      </div>
    );

  if (isPending) return <LoadingIndicator />;

  return (
    <div className="pt-[8rem] max-w-7xl mx-auto px-4 mb-40">
      <MetaData
        title="Koszyk | H Meble"
        content="Sprawdź zawartość koszyka. Przeglądaj wybrane produkty, dostosuj ilości i usuń niepotrzebne przedmioty. Gotowy do zakupu? Przejdź do podsumowania zamówienia."
      />
      <h1 className="text-2xl font-bold mb-4">Koszyk</h1>
      {Array.isArray(cartItems) && cartItems.length === 0 ? (
        <h1 className="text-2xl mt-14">Twój koszyk jest pusty</h1>
      ) : (
        <>
          <Title />
          <CartList cartItems={cartItems} />
          <Summary cartItems={cartItems} />
        </>
      )}
    </div>
  );
};
export default Cart;
