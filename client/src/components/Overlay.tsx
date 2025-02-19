import { useOverlay } from "../hooks/other/useOverlay";

const Overlay = () => {
  const { isOverlayVisible } = useOverlay();

  return (
    <div
      className={`${
        isOverlayVisible ? "opacity-50 z-[5]" : "opacity-0 z-[-5]"
      } fixed inset-0 w-screen h-screen bg-black duration-300`}
    ></div>
  );
};

export default Overlay;
