import { Outlet } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import Overlay from "./components/Overlay";
import Cart from "./components/Cart/Cart";
import ScrollToTop from "./components/ScrollToTop";

export default function Layout() {
  return (
    <div>
      <ScrollToTop />
      <Overlay />
      <Navbar />
      <Cart />
      <Outlet />
      <Footer />
    </div>
  );
}
