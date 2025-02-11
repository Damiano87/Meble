import { Outlet, useLocation } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import Overlay from "./components/Overlay";
import AsideCart from "./components/AsideCart/AsideCart";
import ScrollToTop from "./components/ScrollToTop";

export default function Layout() {
  const location = useLocation();
  const hideFooterOnRoutes = ["/cart"];

  return (
    <div>
      <ScrollToTop />
      <Overlay />
      <Navbar />
      <AsideCart />
      <Outlet />
      {!hideFooterOnRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}
