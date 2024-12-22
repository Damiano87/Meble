import { Link } from "react-router";

const LinkToCategories = () => {
  return (
    <Link to={"/categories"} className="hidden md:block">
      <p className="kategorie uppercase font-semibold cursor-pointer">
        kategorie
      </p>
    </Link>
  );
};
export default LinkToCategories;
