import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const GoBackBtn = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant={"secondary"}
      className="order-1 md:order-none bg-red-900 text-white hover:text-red-900 hover:border-red-900 border duration-500 px-7"
      onClick={() => navigate(-1)}
    >
      Anuluj
    </Button>
  );
};
export default GoBackBtn;
