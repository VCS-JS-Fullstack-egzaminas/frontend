import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "../pages/Admin/AdminHeader/AdminHeader";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const AdminLayout = () => {
  const { loading, user, role } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user || role !== "admin") {
        navigate("/");
      }
    }
  }, [role, loading, user, navigate]);

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
