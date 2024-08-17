import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logos/Logo";

const Navbar = () => {
  return (
    <nav className="navbar flex justify-center bg-slate-100 shadow-sm">
      <div className="container px-6 py-2">
        <div className="flex justify-between items-center">
          <Link to="/">
            <div className="flex items-center gap-1">
              <Logo color={"dark"} className="w-24 h-14" />
            </div>
          </Link>
          <div className="flex gap-3 items-center">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/about-us"}>About us</NavLink>
            <NavLink to={"/contact"}>Contacts</NavLink>
            <Link
              to="/login"
              className="text-white px-4 py-1 font-semibold rounded-md transition duration-150 shadow-md bg-ecstasy-500 hover:bg-ecstasy-600 active:bg-ecstasy-700"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-white px-3 py-1 font-semibold rounded-md transition duration-150 shadow-md bg-ecstasy-500 hover:bg-ecstasy-600 active:bg-ecstasy-700"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
