import { MoonLoader } from "react-spinners";

const LoadingIndicator = () => {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center min-h-screen w-screen bg-black/50">
      <MoonLoader color="red" />
    </div>
  );
};
export default LoadingIndicator;
