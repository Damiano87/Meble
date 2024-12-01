import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { OverlayProvider } from "./context/overlayContext.tsx";
import { CartProvider } from "./context/cartContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OverlayProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </OverlayProvider>
  </StrictMode>
);
