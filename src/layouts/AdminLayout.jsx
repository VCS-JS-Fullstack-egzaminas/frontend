import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "../pages/Admin/AdminHeader/AdminHeader";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const AdminLayout = () => {
  // TODO - fix redirect out of admin panel if role !== "admin"
  // const { user, role } = useAuth();

  // const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(role, user);
  // }, [role]);

  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
