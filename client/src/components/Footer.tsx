import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-28 pt-7 pb-3 bg-black">
      <div className="flex gap-x-3 justify-center">
        <button className=" p-2 rounded-full hover:scale-110 hover:text-yellow-600 transition-all duration-300 cursor-pointer">
          <FaFacebookF />
        </button>
        <button className=" p-2 rounded-full hover:scale-110 hover:text-yellow-600 transition-all duration-300 cursor-pointer">
          <FaInstagram />
        </button>
        <button className=" p-2 rounded-full hover:scale-110 hover:text-yellow-600 transition-all duration-300 cursor-pointer">
          <FaTwitter />
        </button>
      </div>
      <div className="flex justify-center flex-wrap gap-x-3 text-white text-[.8rem] mt-10 w-[14rem] mx-auto">
        <h4 className="hover:text-yellow-600 cursor-pointer">Info</h4>
        <h4 className="hover:text-yellow-600 cursor-pointer">Support</h4>
        <h4 className="hover:text-yellow-600 cursor-pointer">Marketing</h4>
        <h4 className="hover:text-yellow-600 cursor-pointer">Regulamin</h4>
        <h4 className="hover:text-yellow-600 cursor-pointer">
          Polityka Prywatności
        </h4>
      </div>
      <div className="bg-slate-900 px-6 py-4 my-6">
        <h1 className="text-white text-[1.3rem] text-center">Newsletter</h1>
        <div className="flex justify-center">
          <form className="flex gap-x-3  mt-2">
            <input
              type="email"
              className="w-40 sm:w-56 text-[0.8rem] px-2 py-1"
              placeholder="your email"
            />
            <button className="bg-yellow-600 text-white text-[0.7rem] sm:text-[1rem] tracking-wider px-2">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 text-slate-300 text-[.8rem] mt-4">
        <div className="flex items-center gap-1">
          <FaRegCopyright />
          <p>{new Date().getFullYear()}</p>
        </div>
        <p>H Design Studio</p>
      </div>
    </footer>
  );
};

export default Footer;
