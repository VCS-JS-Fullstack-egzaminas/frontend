import { Outlet } from "react-router-dom";
import AdminHeader from "../pages/Admin/AdminHeader/AdminHeader";

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
