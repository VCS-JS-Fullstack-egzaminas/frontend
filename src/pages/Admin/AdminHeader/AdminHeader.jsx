import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import Logo from "../../../components/Logos/Logo";

const AdminHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const tabStyleClasses =
    "px-4 pb-4 border-b-2 hover:border-ecstasy-500 hover:text-ecstasy-500";
  const activeTabStyleClasses = "border-ecstasy-500 text-ecstasy-500";

  return (
    <header className="flex justify-between items-end px-6 pt-2 relative">
      <Link to="/">
        <div className="flex items-center gap-1">
          <Logo color={"dark"} className="w-24 h-14" />
          <span className="text-ecstasy-500 font-bold text-2xl">.admin</span>
        </div>
      </Link>
      <nav>
        <div className={`menu-wrapper ${isMenuOpen ? "open bg-white" : ""}`}>
          <div
            className={`justify-end gap-4 md:flex menu`}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${tabStyleClasses} ${
                  isActive ? activeTabStyleClasses : "border-river-bed-800"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="users"
              className={({ isActive }) =>
                `${tabStyleClasses} ${
                  isActive ? activeTabStyleClasses : "border-river-bed-800"
                }`
              }
            >
              Users
            </NavLink>
            <NavLink
              to="listings"
              className={({ isActive }) =>
                `${tabStyleClasses} ${
                  isActive ? activeTabStyleClasses : "border-river-bed-800"
                }`
              }
            >
              Listings
            </NavLink>
            <NavLink
              to="reservations"
              className={({ isActive }) =>
                `${tabStyleClasses} ${
                  isActive ? activeTabStyleClasses : "border-river-bed-800"
                }`
              }
            >
              Reservations
            </NavLink>
          </div>
        </div>
        <button
          id="mobile-menu-btn"
          className="md:hidden self-center"
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
      </nav>
    </header>
  );
};

export default AdminHeader;
