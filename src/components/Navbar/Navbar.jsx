import { useState } from "react";
import Authentication from "../Authentication/Authentication";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { MdiCar } from "../ui/icons/MdiCar";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <nav className="flex justify-center bg-white shadow-sm">
      <div className="container px-6 py-2">
        <div className="flex justify-between items-center">
          <Link to="/">
            <div className="flex items-center gap-1">
              <MdiCar className="h-10 w-10 text-river-bed-800" />
              <div className="flex flex-col items-center">
                <span className="text-2xl leading-none text-ecstasy-500">
                  index
                </span>
                <span className="text-lg text-river-bed-800 leading-none">
                  rentals
                </span>
              </div>
            </div>
          </Link>
          {/* <div className="navbar-links">
            <button
              className="login-button"
              onClick={() => setShowLogin(!showLogin)}
            >
              {showLogin ? "Close" : "Login"}
            </button>
          </div> */}
          <div className="flex items-center">
            <Link className="text-white px-6 py-2 font-semibold rounded-md transition duration-150 shadow-md bg-ecstasy-500 hover:bg-ecstasy-600 active:bg-ecstasy-700">
              Login
            </Link>
          </div>
        </div>
        {/* {showLogin && <Authentication />} */}
      </div>
    </nav>
  );
};

export default Navbar;
