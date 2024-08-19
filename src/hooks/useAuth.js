import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider/AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    console.error("useAuth must be used within AuthProvider");
    return;
  }

  return context;
};
