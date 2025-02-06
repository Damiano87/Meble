import { TfiClose } from "react-icons/tfi";
import ChangeAmount from "./ChangeAmount";

const CartItem = () => {
  return (
    <div className="rounded-md p-4 flex flex-col md:flex-row gap-y-5 justify-between">
      <div className="flex items-start gap-6">
        <div className="w-24 aspect-square flex items-center">
          <img
            src="https://res.cloudinary.com/damiano/image/upload/v1733423471/bed1_pzllhw.jpg"
            className="max-w-full max-h-full object-cover"
            alt="bed"
          />
        </div>
        <div>
          <div className="flex items-center gap-5">
            <h4>Zestaw 2 krzeseł do jadalni CRAIG Drewno Ciemne drewno</h4>
            <button className="cursor-pointer">
              <TfiClose size={20} />
            </button>
          </div>
          <p className="text-[.8rem] mt-2">Dostępne: TAK</p>
          <p className="text-[.8rem]">
            <span>Prawo zwrotu: </span>
            <span className="text-red-900">365 dni</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end md:justify-normal gap-5 h-fit">
        <ChangeAmount />
        <span className="text-[1.1rem]">639,-</span>
      </div>
    </div>
  );
};

export default CartItem;
