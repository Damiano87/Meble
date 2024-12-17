const AddToCart = () => {
  return (
    <div className="mt-8">
      <button
        // onClick={() => dispatch(addItem(singleProduct))}
        className="block w-full font-semibold cursor-pointer bg-red-900 hover:bg-white text-white hover:text-red-900 duration-500 px-3 py-2 border-2 border-red-900 rounded-sm"
      >
        Do koszyka
      </button>
    </div>
  );
};
export default AddToCart;
