// import {
//   removeItem,
//   incrementInCart,
//   decrementInCart,
// } from "@/lib/features/cartSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
// import { useSelector, useDispatch } from "react-redux";

const CartItem = ({
  id,
  name,
  price,
  category,
  inStore,
  likes,
  images,
  amount,
  subTotalPrice,
}) => {
  //   const dispatch = useDispatch();

  return (
    <div className="relative flex justify-between items-center border border-black p-2">
      <div className="relative h-[5rem] w-[5rem]">
        <img
          src={images[0]}
          sizes="(max-width: 768px) 100vw"
          className="object-contain"
          alt={name}
        />
      </div>
      <div>
        <p className="capitalize font-medium">{name.slice(0, 10)}...</p>
        <div className="flex items-center mt-3">
          <button
            // onClick={() => dispatch(decrementInCart(id))}
            className="border border-black bg-yellow-600 hover:bg-slate-300 duration-300 text-[1.3rem] w-8 cursor-pointer"
          >
            -
          </button>
          <p className="grid place-content-center border border-l-0 border-r-0 border-black text-[1.3rem] w-8">
            {amount}
          </p>
          <button
            // onClick={() => dispatch(incrementInCart(id))}
            className="border border-black bg-yellow-600 hover:bg-slate-300 duration-300 text-[1.3rem] w-8 cursor-pointer"
          >
            +
          </button>
        </div>
      </div>
      <div>
        <p className="font-semibold">{subTotalPrice.toFixed(2)} zł</p>
      </div>
      <button
        // onClick={() => dispatch(removeItem(id))}
        className="absolute top-2 right-2"
      >
        <RiDeleteBin6Line className="hover:text-red-600 duration-300" />
      </button>
    </div>
  );
};

export default CartItem;
