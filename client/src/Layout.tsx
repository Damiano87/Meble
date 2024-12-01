import { Outlet } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import Overlay from "./components/Overlay";
import Cart from "./components/Cart/Cart";

export default function Layout() {
  return (
    <div>
      <Overlay />
      <Navbar />
      <Cart />
      <Outlet />
      <Footer />
    </div>
  );
}
