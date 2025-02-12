import { useRef } from "react";
import { useCart } from "../../hooks/useCart";
import { useOverlay } from "../../hooks/useOverlay";
import { useClickAway } from "react-use";
import EmptyCart from "./EmptyCart";
import GetAmount from "./GetAmount";
import CloseCart from "./CloseCart";
import AsideCartList from "./AsideCartList";
import { useGetCartItems } from "@/hooks/useGetCartItems";
import NotLogedIn from "./NotLogedIn";
import { useAuth } from "@/hooks/useAuth";

const AsideCart = () => {
  const { username } = useAuth();

  const { data: cartItems } = useGetCartItems({
    enabled: !!username,
  });

  const { openCart, setOpenCart } = useCart();
  const { setIsOverlayVisible } = useOverlay();
  const cartRef = useRef<HTMLDivElement>(null);

  // click away cart
  useClickAway(cartRef, () => {
    setOpenCart(false);
    setIsOverlayVisible(false);
  });

  return (
    <aside
      ref={cartRef}
      className={`${
        openCart ? "translate-x-0" : "translate-x-full"
      } fixed top-0 right-0 w-screen max-w-[30rem] h-screen bg-white shadow-xl z-10 p-4 transition duration-500`}
    >
      <div className="flex items-center">
        <GetAmount cartItems={cartItems} />
        <CloseCart />
      </div>
      {!cartItems ? (
        <NotLogedIn />
      ) : (
        <>
          {cartItems?.length > 0 ? (
            <AsideCartList cartItems={cartItems} />
          ) : (
            <EmptyCart />
          )}
        </>
      )}
    </aside>
  );
};

export default AsideCart;
