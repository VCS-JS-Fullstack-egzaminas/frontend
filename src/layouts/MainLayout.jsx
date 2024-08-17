import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const mainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="mt-[72px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default mainLayout;
