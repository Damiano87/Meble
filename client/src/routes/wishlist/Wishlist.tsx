import { useWishlist } from "@/hooks/useWishList";
import List from "./components/List";
import LoadingIndicator from "@/components/LoadingIndicator";
import TotalAmount from "./components/TotalAmount";
import MetaData from "@/components/Meta";

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

  if (wishlist.length === 0)
    return (
      <div className="pt-44 max-w-7xl mx-auto px-4 space-y-6">Brak życzeń</div>
    );

  return (
    <div className="pt-44 max-w-7xl mx-auto px-4 space-y-6">
      <MetaData title="Lista życzeń" content="Lista życzeń" />
      <h1 className="text-3xl font-semibold">Lista życzeń</h1>
      <div className="flex justify-between px-4">
        <span className="text-2xl font-medium">Artykuł</span>
        <span className="text-2xl font-medium">Cena</span>
      </div>
      <List wishlist={wishlist} />
      <TotalAmount wishlist={wishlist} />
    </div>
  );
};
export default Wishlist;
