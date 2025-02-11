import CartItem from "./CartItem";
import { useState, useRef } from "react";
import { useCart } from "../../hooks/useCart";
import { useOverlay } from "../../hooks/useOverlay";
import { useClickAway } from "react-use";
import EmptyCart from "./EmptyCart";
import GetAmount from "./GetAmount";
import CloseCart from "./CloseCart";

const AsideCart = () => {
  const { openCart, setOpenCart } = useCart();
  const { setIsOverlayVisible } = useOverlay();
  const [cartItems, setCartItems] = useState([1]);
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
      <div className="flex justify-between items-center">
        <GetAmount cartItems={cartItems} />
        <CloseCart />
      </div>
      <EmptyCart />
    </aside>
  );
};

export default AsideCart;
