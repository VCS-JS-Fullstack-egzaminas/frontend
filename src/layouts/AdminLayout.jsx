import { Outlet } from "react-router-dom";
import AdminHeader from "../pages/Admin/AdminHeader/AdminHeader";

const AdminLayout = () => {
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
