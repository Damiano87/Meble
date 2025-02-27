import { Button } from "@/components/ui/button";

const SubmitFormBtn = ({ isPending }: { isPending: boolean }) => {
  return (
    <Button
      variant={"secondary"}
      type="submit"
      className="text-white bg-red-900 hover:bg-white hover:text-red-900 border border-red-900 duration-500"
    >
      {isPending ? "Zapisywanie..." : "Zapisz"}
    </Button>
  );
};
export default SubmitFormBtn;
