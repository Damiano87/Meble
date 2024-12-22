import { Link } from "react-router";
import logo from "/images/logolight.png";

const Logo = () => {
  return (
    <Link to={"/"}>
      <img src={logo} width={100} height={100} alt="Logo" />
    </Link>
  );
};
export default Logo;
