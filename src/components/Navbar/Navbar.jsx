import { useState } from "react";
import Authentication from "../Authentication/Authentication";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/">
          <div className="logo">.Index Rentals</div>
        </NavLink>
        <div className="navbar-links">
          <button
            className="login-button"
            onClick={() => setShowLogin(!showLogin)}
          >
            {showLogin ? "Close" : "Login"}
          </button>
        </div>
      </div>
      {showLogin && <Authentication />}
    </nav>
  );
};

export default Navbar;
