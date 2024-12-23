import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { OverlayProvider } from "./context/overlayContext.tsx";
import { CartProvider } from "./context/cartContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </OverlayProvider>
    </QueryClientProvider>
  </StrictMode>
);
