import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logos/Logo";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { user, role, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false);
      }, 300); // Duration of the slideOut animation
    } else {
      setIsMenuOpen(true);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const handleClickOutside = (event) => {
    if (
      !event.target.closest(".menu-wrapper") &&
      !event.target.closest("#mobile-menu-btn")
    ) {
      toggleMenu();
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

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
            <button
              id="mobile-menu-btn"
              className="md:hidden"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 fill-black"
                viewBox="0 0 24 24"
              >
                <rect
                  className="line1"
                  width="18"
                  height="1.5"
                  x="3"
                  y="6"
                  rx="0.5"
                ></rect>
                <rect
                  className="line2"
                  width="18"
                  height="1.5"
                  x="3"
                  y="11"
                  rx="0.75"
                ></rect>
                <rect
                  className="line3"
                  width="18"
                  height="1.5"
                  x="3"
                  y="16"
                  rx="0.75"
                ></rect>
              </svg>
            </button>
            <div
              className={`menu-wrapper ${isMenuOpen ? "open" : ""} ${
                isClosing ? "closing" : ""
              }`}
            >
              <div className="menu md:flex gap-3 items-center bg-slate-100/95">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-ecstasy-400 hover:text-ecstasy-400"
                      : "hover:text-ecstasy-400"
                  }
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-ecstasy-400 hover:text-ecstasy-400"
                      : "hover:text-ecstasy-400"
                  }
                  to="/about-us"
                >
                  About us
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-ecstasy-400 hover:text-ecstasy-400"
                      : "hover:text-ecstasy-400"
                  }
                  to="/contact"
                >
                  Contacts
                </NavLink>
                {user ? (
                  <>
                    <NavLink to="/my-reservations">My reservations</NavLink>
                    {role === "admin" && (
                      <NavLink to="/admin">Admin panel</NavLink>
                    )}
                    <button
                      className="text-white px-4 py-1 font-semibold rounded-md transition duration-150 shadow-md bg-ecstasy-500 hover:bg-ecstasy-600 active:bg-ecstasy-700"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth/login"
                      className="text-white px-4 py-1 font-semibold rounded-md transition duration-150 shadow-md bg-ecstasy-500 hover:bg-ecstasy-600 active:bg-ecstasy-700"
                    >
                      Login
                    </Link>
                    <Link
                      to="/auth/signup"
                      className="text-white px-3 py-1 font-semibold rounded-md transition duration-150 shadow-md bg-ecstasy-500 hover:bg-ecstasy-600 active:bg-ecstasy-700"
                    >
                      Signup
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
