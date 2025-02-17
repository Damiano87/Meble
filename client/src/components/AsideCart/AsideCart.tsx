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
import Summary from "@/routes/cart/components/Summary";
import GoToCartRoute from "./GoToCartRoute";

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
      } fixed top-0 right-0 w-screen h-full max-w-[30rem] bg-white shadow-xl z-10 p-5 sm:p-4 transition duration-500 overflow-scroll`}
    >
      <div className="flex items-start sm:items-center gap-2">
        {cartItems && (
          <div className="sm:flex items-center gap-x-2">
            <GetAmount cartItems={cartItems} />
            <GoToCartRoute />
          </div>
        )}
        <CloseCart />
      </div>
      {!cartItems ? (
        <NotLogedIn />
      ) : (
        <>
          {cartItems?.length > 0 ? (
            <div className="space-y-4 mx-auto">
              <AsideCartList cartItems={cartItems} />
              <Summary cartItems={cartItems} />
            </div>
          ) : (
            <EmptyCart />
          )}
        </>
      )}
    </aside>
  );
};

export default AsideCart;
