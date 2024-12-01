import logo from "/images/logolight.png";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import Sidebar from "./Sidebar";
import { useOverlay } from "../../hooks/useOverlay";
import { useCart } from "../../hooks/useCart";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [scrolling, setScrolling] = useState(false);
  const { setIsOverlayVisible } = useOverlay();
  const { setOpenCart } = useCart();
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
          <Link to={"/"}>
            <img src={logo} width={100} height={100} alt="Logo" />
          </Link>

          <div className="flex gap-x-5 mr-7">
            <div className="hidden md:flex gap-x-5">
              <Link to={"/categories"}>
                <p className="kategorie uppercase font-semibold cursor-pointer">
                  kategorie
                </p>
              </Link>

              <Link
                to={"/popularne"}
                className="popularne uppercase font-semibold cursor-pointer"
                //   onClick={scrollToSection}
              >
                popularne
              </Link>
            </div>
            <button
              onClick={() => {
                setOpenCart(true);
                setIsOverlayVisible(true);
              }}
              className="relative cursor-pointer hover:scale-110 transition duration-300"
            >
              <FaShoppingCart size={25} />
              {cartItems?.length ? (
                <div className="absolute -top-1 md:-top-2 -right-2 badge badge-primary badge-xs bg-red-600 text-white text-[0.7rem] h-[1.2rem] aspect-square">
                  {cartItems.length}
                </div>
              ) : null}
            </button>

            <button
              className="md:hidden cursor-pointer hover:scale-110 transition duration-300"
              onClick={() => {
                setIsVisible(true);
                setIsOverlayVisible(true);
              }}
            >
              <GiHamburgerMenu size={25} />
            </button>
          </div>
        </div>
      </nav>
      <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} />
    </header>
  );
};

export default Navbar;
