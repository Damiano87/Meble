import { PiFireFill } from "react-icons/pi";

const UserWishCount = ({ wishProductCount }: { wishProductCount: number }) => {
  if (wishProductCount === 0) return null;

  return (
    <div className="flex items-center gap-2 text-sm mt-7">
      <PiFireFill size={25} />
      <p>
        {wishProductCount} {wishProductCount === 1 ? "klient" : "klientów"}{" "}
        właśnie zakochuje się w tym produkcie.
      </p>
    </div>
  );
};
export default UserWishCount;
