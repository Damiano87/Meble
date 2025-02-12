import { RiLoginCircleFill } from "react-icons/ri";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router";

const NotLogedIn = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col justify-center h-full">
      <div className=" rounded-lg p-4">
        <p className="text-black text-center font-semibold mb-14 italic">
          Musisz być zalogowany aby zobaczyć koszyk...
        </p>
        <Link to={"/login"} state={{ from: `${location.pathname}` }}>
          <Button
            variant="ghost"
            className="flex flex-col w-fit h-fit mx-auto mt-4 [&_svg]:size-14 text-red-900 animate-pulse"
          >
            <RiLoginCircleFill />
            <span>Zaloguj się</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default NotLogedIn;
