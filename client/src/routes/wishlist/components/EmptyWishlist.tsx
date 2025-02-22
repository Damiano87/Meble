import emptyWishlist from "/images/svg/undraw_wishlist.svg";

const EmptyWishlist = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:justify-between gap-y-10 max-w-7xl mx-auto px-4 space-y-6 h-screen">
      <h1 className="md:text-[2rem] font-semibold">
        Lista życzeń jest pusta...
      </h1>
      <img src={emptyWishlist} alt="empty wishlist" className="w-[40rem]" />
    </div>
  );
};
export default EmptyWishlist;
