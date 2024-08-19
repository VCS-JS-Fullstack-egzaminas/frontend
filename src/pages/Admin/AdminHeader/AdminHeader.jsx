
import { NavLink } from "react-router-dom";
import { MdiCar } from "../../../components/ui/icons/MdiCar";


const AdminHeader = () => {
  const tabStyleClasses =
    "p-4 border-b-2 border-river-bed-800 hover:border-ecstasy-500 hover:text-ecstasy-500";
  const activeTabStyleClasses = "border-ecstasy-500 text-ecstasy-500";

  return (
    <header className="admin-header flex justify-between items-center px-4 pt-4">

      <NavLink to="/admin">
        <div className="flex items-center gap-1">
          <MdiCar className="h-10 w-10 text-river-bed-800" />
          <div className="flex flex-col items-left">
            <span className="text-2xl leading-none text-ecstasy-500">
              <strong>VCS</strong>.admin
            </span>
            <span className="text-lg text-river-bed-800 leading-none">
              rentals
            </span>
          </div>
        </div>
      </NavLink>
      <nav className="flex gap-4">
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
      </nav>
    </header>
  );
};

export default AdminHeader;
