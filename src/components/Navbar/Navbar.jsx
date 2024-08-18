import { useState } from "react";
import Authentication from "../Authentication/Authentication";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { MdiCar } from "../ui/icons/MdiCar";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <nav className="navbar flex justify-center bg-slate-100 shadow-sm">
      <div className="container px-6 py-2">
        <div className="flex justify-between items-center">
          <Link to="/">
            <div className="flex items-center gap-1">
              <MdiCar className="h-10 w-10 text-river-bed-800" />
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold leading-none text-ecstasy-500">
                  VCS
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
            <Link
              to="/login"
              className="text-white px-4 py-1 mx-3 font-semibold rounded-md transition duration-150 shadow-md bg-ecstasy-500 hover:bg-ecstasy-600 active:bg-ecstasy-700"
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
        {/* {showLogin && <Authentication />} */}
     
      </div>
    
    </nav>
  );
};

export default Navbar;
