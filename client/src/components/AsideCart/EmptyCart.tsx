import emptyCart from "/images/svg/emptycart.svg";

const EmptyCart = () => {
  return (
    <div className="grid place-content-center min-h-screen">
      <div className="h-[18rem] w-[18rem] mx-auto">
        <img src={emptyCart} alt="empty cart" />
      </div>
      <p className="capitalize font-semibold text-center">koszyk jest pusty</p>
    </div>
  );
};
export default EmptyCart;
