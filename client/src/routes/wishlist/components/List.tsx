import { WishlistItem } from "@/utils/types";
import WishItem from "./WishItem";

const List = ({ wishlist }: { wishlist: WishlistItem[] }) => {
  return (
    <div>
      {wishlist.map((item) => (
        <WishItem key={item.id} {...item} />
      ))}
    </div>
  );
};
export default List;
