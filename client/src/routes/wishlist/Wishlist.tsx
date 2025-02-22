import { useWishlist } from "@/hooks/wishlist/useWishList";
import List from "./components/List";
import LoadingIndicator from "@/components/LoadingIndicator";
import TotalAmount from "./components/TotalAmount";
import MetaData from "@/components/Meta";
import BottomPanel from "./components/BottomPanel";
import EmptyWishlist from "./components/EmptyWishlist";

const Wishlist = () => {
  const { wishlist, isLoading } = useWishlist();

  if (!wishlist)
    return (
      <div className="pt-44 max-w-7xl mx-auto px-4 space-y-6">Zaloguj się</div>
    );

  if (isLoading)
    return (
      <div className="h-screen">
        <LoadingIndicator />
      </div>
    );

  return (
    <div className="pt-28 md:pt-44 max-w-7xl mx-auto px-4 space-y-6">
      <MetaData title="Lista życzeń | H Meble" content="Lista życzeń" />
      {wishlist.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <>
          <h1 className="text-3xl font-semibold">Lista życzeń</h1>
          <div className="flex justify-between px-4">
            <span className="text-2xl font-medium">Artykuł</span>
            <span className="text-2xl font-medium">Cena</span>
          </div>
          <List wishlist={wishlist} />
          <TotalAmount wishlist={wishlist} />
          <BottomPanel />
        </>
      )}
    </div>
  );
};
export default Wishlist;
