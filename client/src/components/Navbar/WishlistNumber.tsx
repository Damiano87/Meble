import { Link } from "react-router";
import WishlistBadge from "./WishlistBadge";
import { CiHeart } from "react-icons/ci";

const WishlistNumber = () => {
  return (
    <Link
      to={"/wishlist"}
      className="relative cursor-pointer hover:scale-110 transition duration-300"
    >
      <CiHeart size={25} />
      <WishlistBadge />
    </Link>
  );
};
export default WishlistNumber;
