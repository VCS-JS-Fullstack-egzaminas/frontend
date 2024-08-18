import PropTypes from "prop-types";

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkAuthStatus,
  checkCookie,
  login,
  logout,
  signup,
} from "../../services/userService";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkCookie()
      .then((cookieExists) => {
        if (cookieExists) {
          return checkAuthStatus();
        } else {
          throw new Error("No auth cookie");
        }
      })
      .then((res) => {
        setUser(res.data);
        setRole(res.data.role);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const signUp = async (email, username, password) => {
    const user = await signup({ email, username, password });
    setUser(user);
  };

  const logIn = async (email, password) => {
    const user = await login({ email, password });
    setUser(user);
    navigate("/");
  };

  const logOut = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error.message);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, role, signUp, logIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
