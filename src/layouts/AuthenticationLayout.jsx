import AuthProvider from "../components/AuthProvider/AuthProvider";
import { Link, Outlet } from "react-router-dom";
import Logo from "../components/Logos/Logo";

const AuthenticationLayout = () => {
  return (
    <>
      <AuthProvider>
        <div className="relative flex justify-center min-h-screen">
          <div className="flex flex-col gap-8 items-center justify-center min-h-screen sm:px-12 pb-[84px]">
            <Link to="/">
              <Logo color={"dark"} className="w-48 h-24" />
            </Link>
            <div className="flex justify-center items-center">
              <Outlet />
            </div>
          </div>
          <div className="h-full overflow-hidden w-full hidden sm:block">
            <img
              className="max-h-screen min-h-screen w-full object-cover"
              src="/auth-bg.jpg"
              alt="Road"
            />
          </div>
        </div>
      </AuthProvider>
    </>
  );
};

export default AuthenticationLayout;
