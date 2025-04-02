import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const GoBack = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-44 max-w-7xl mx-auto px-4 h-screen space-y-4">
      <p className="text-[1.3rem] font-semibold">
        Nie znaleziono żądanego zamówienia...
      </p>
      <Button
        variant={"secondary"}
        className="bg-red-900 text-white border border-red-900 hover:text-red-900"
        onClick={() => navigate(-1)}
      >
        Wróć
      </Button>
    </div>
  );
};
export default GoBack;
