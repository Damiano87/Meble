import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineMinus } from "react-icons/hi2";
import { Input } from "@/components/ui/input";

const ChangeAmount = () => {
  return (
    <div className="border-[1px] border-red-900 text-red-900 flex items-center justify-center gap-1 px-[2px] py-1 rounded-sm">
      <button className="rounded-full hover:bg-slate-200 duration-300 p-[1px]">
        <HiOutlineMinus size={18} />
      </button>
      <Input
        defaultValue={1}
        max={99}
        maxLength={2}
        className="w-7 h-7 px-[5px] font-medium border-none focus-visible:ring-0 text-center"
      />
      <button className="rounded-full hover:bg-slate-200 duration-300 p-[1px]">
        <AiOutlinePlus size={18} />
      </button>
    </div>
  );
};
export default ChangeAmount;
