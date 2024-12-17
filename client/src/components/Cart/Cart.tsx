import { IoMdClose } from "react-icons/io";
import emptyCart from "/images/emptycart.svg";

import CartItem from "./CartItem";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../../hooks/useCart";
import { useOverlay } from "../../hooks/useOverlay";

const Cart = () => {
  const { openCart, setOpenCart } = useCart();
  const { setIsOverlayVisible } = useOverlay();
  const [cartItems, setCartItems] = useState([]);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // close cart
    const handleOutsideClick = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setOpenCart(false);
        setIsOverlayVisible(false);
      }
    };

    if (openCart) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openCart, setIsOverlayVisible, setOpenCart]);

  return (
    <aside
      ref={cartRef}
      className={`${
        openCart ? "translate-x-0" : "translate-x-full"
      } fixed top-0 right-0 w-screen max-w-[30rem] h-screen bg-white shadow-xl z-10 p-4 transition duration-500`}
    >
      <div className="flex justify-between items-center">
        {cartItems.length === 0 && (
          <p className="text-[1.2rem] font-semibold">0 pozycji</p>
        )}
        {cartItems.length === 1 && (
          <p className="text-[1.2rem] font-semibold">1 pozycja</p>
        )}
        {cartItems.length > 1 && cartItems.length < 5 && (
          <p className="text-[1.2rem] font-semibold">
            {cartItems.length} pozycje
          </p>
        )}
        {cartItems.length >= 5 && (
          <p className="text-[1.2rem] font-semibold">
            {cartItems.length} pozycji
          </p>
        )}
        <IoMdClose
          onClick={() => {
            setOpenCart(false);
            setIsOverlayVisible(false);
          }}
          className="text-[2rem] cursor-pointer hover:scale-110 transition-all duration-300"
        />
      </div>
      {cartItems.length ? (
        <div className="flex flex-col h-full justify-between">
          <div className="grid gap-y-4 mt-6 overflow-auto pr-2">
            {/* {cartItems.map((item) => {
              return <CartItem key={item.id} {...item} />;
            })} */}
          </div>
          <div className="flex justify-between items-center border-t-2 border-black p-3 my-5">
            <div className="flex gap-x-4">
              <h4 className="text-[1.3rem] font-semibold">Total:</h4>
              {/* <h4 className="text-[1.3rem] font-semibold">
                {cartItems &&
                  cartItems
                    .reduce((acc, object) => acc + object.subTotalPrice, 0)
                    .toFixed(2)}
                zł
              </h4> */}
            </div>
            <button className="text-white font-semibold tracking-widest bg-yellow-600 border-2 border-black px-3 cursor-pointer hover:bg-white hover:text-yellow-600 duration-300">
              Zapłać
            </button>
          </div>
        </div>
      ) : (
        <div className="grid place-content-center min-h-screen">
          <div className="h-[18rem] w-[18rem] mx-auto">
            <img src={emptyCart} alt="empty cart" />
          </div>
          <p className="capitalize font-semibold text-center">
            koszyk jest pusty
          </p>
        </div>
      )}
    </aside>
  );
};

export default Cart;

//   const isCartVisible = useSelector((state) => state.cart.isCartVisible);
//   const cartItems = useSelector((state) => state.cart.cartItems);
//   const totalPrice = useSelector((state) => state.cart.totalPrice);
//   const dispatch = useDispatch();
// import { hideCart, getTotal } from "@/lib/features/cartSlice";
// import { useSelector, useDispatch } from "react-redux";
