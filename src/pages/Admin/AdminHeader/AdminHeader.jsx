import { NavLink } from "react-router-dom";
import { MdiCar } from "../../../components/ui/icons/MdiCar";
import "./AdminHeader.css";

const AdminHeader = () => {
  return (
    <header className="admin-header flex justify-between items-center p-4 bg-orange-100	">
      <NavLink to="/admin">
        <div className="flex items-center gap-1">
          <MdiCar className="h-10 w-10 text-river-bed-800" />
          <div className="flex flex-col items-left">
            <span className="text-2xl leading-none text-ecstasy-500">
              index.admin
            </span>
            <span className="text-lg text-river-bed-800 leading-none">
              rentals
            </span>
          </div>
        </div>
      </NavLink>
      <nav className="flex gap-4">
        <NavLink to="users">Users</NavLink>
        <NavLink to="listings">Listings</NavLink>
        <NavLink to="reservations">Reservations</NavLink>
      </nav>
    </header>
  );
};

export default AdminHeader;
