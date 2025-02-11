import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import LinkToCategories from "./LinkToCategories";
import Logo from "./Logo";
import CartButton from "./CartButton";
import HamburgerButton from "./HamburgerButton";
import UserButton from "./UserButton";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <nav
        ref={navbarRef}
        className={`${
          scrolling ? "py-1" : "py-0"
        } fixed top-0 w-full shadow-md bg-white z-[1] transition-all duration-500`}
      >
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Logo />
          <div className="flex items-center gap-x-5 mr-7">
            <LinkToCategories />
            <UserButton />
            <CartButton />
            <HamburgerButton setIsVisible={setIsVisible} />
          </div>
        </div>
      </nav>
      <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} />
    </header>
  );
};

export default Navbar;
