import { Outlet, useLocation } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import Overlay from "./components/Overlay";
import AsideCart from "./components/AsideCart/AsideCart";
import ScrollToTop from "./components/ScrollToTop";
import { CartSyncProvider } from "./context/cartSyncContext";

export default function Layout() {
  const location = useLocation();
  const hideFooterOnRoutes = ["/cart"];

  return (
    <CartSyncProvider>
      <div>
        <ScrollToTop />
        <Overlay />
        <Navbar />
        <AsideCart />
        <Outlet />
        {!hideFooterOnRoutes.includes(location.pathname) && <Footer />}
      </div>
    </CartSyncProvider>
  );
}
