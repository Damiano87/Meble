const AddToCart = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-8">
      <button
        // onClick={() => dispatch(addItem(singleProduct))}
        className="block w-full uppercase font-semibold cursor-pointer bg-transparent hover:bg-black hover:text-white duration-300 px-3 py-2 border border-black"
      >
        dodaj do koszyka
      </button>
      <button className="block w-full uppercase text-white font-semibold cursor-pointer bg-yellow-600 px-3 py-2 border border-transparent hover:text-yellow-600 hover:border-yellow-600 hover:bg-white duration-300">
        kup teraz
      </button>
    </div>
  );
};
export default AddToCart;
