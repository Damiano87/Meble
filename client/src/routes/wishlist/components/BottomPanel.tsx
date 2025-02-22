import ClearWishlistBtn from "./ClearWishlistBtn";
import SendToEmailBtn from "./SendToEmailBtn";
import TransferAllToCart from "./TransferAllToCart";

const BottomPanel = () => {
  return (
    <div className="flex flex-col md:flex-row gap-y-4 justify-between">
      <ClearWishlistBtn />
      <div className="flex flex-col md:flex-row gap-4">
        <TransferAllToCart />
        <SendToEmailBtn />
      </div>
    </div>
  );
};
export default BottomPanel;
