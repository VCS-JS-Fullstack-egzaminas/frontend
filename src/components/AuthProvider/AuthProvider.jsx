import PropTypes from "prop-types";

import { createContext, useEffect, useState } from "react";
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
    const response = await signup({ email, username, password });
    return response;
  };

  const logIn = async (email, password) => {
    const response = await login({ email, password });
    return response;
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
