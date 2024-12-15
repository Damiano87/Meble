import { RingLoader } from "react-spinners";

const HydrationFallback = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <RingLoader />
    </div>
  );
};
export default HydrationFallback;
