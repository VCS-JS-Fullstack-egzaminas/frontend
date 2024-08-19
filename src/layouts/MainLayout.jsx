import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import AuthProvider from "../components/AuthProvider/AuthProvider";

const mainLayout = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <main className="mt-[72px]">
          <Outlet />
        </main>
        <Footer />
      </AuthProvider>
    </>
  );
};

export default mainLayout;
