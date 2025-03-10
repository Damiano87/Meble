import { Button } from "@/components/ui/button";

type SubmitProps = {
  isPending: boolean;
  withCheckout?: boolean;
};

const SubmitFormBtn = ({ isPending, withCheckout }: SubmitProps) => {
  return (
    <Button
      variant={"secondary"}
      type="submit"
      className="text-white bg-red-900 hover:bg-white hover:text-red-900 border border-red-900 duration-500"
    >
      {isPending ? "Zapisywanie..." : withCheckout ? "Dalej" : "Zapisz"}
    </Button>
  );
};
export default SubmitFormBtn;
