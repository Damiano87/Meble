import { useContext } from "react";
import { OverlayContext } from "../context/overlayContext";

export function useOverlay() {
  const context = useContext(OverlayContext);

  // Dodatkowe zabezpieczenie przed używaniem hooka poza providerem
  if (!context) {
    throw new Error("useVisibility must be used within a VisibilityProvider");
  }

  return context;
}
