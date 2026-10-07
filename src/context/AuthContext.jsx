import { createContext, useContext, useEffect, useState } from "react";
import api, { setAccessToken } from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshLogin = async () => {
    try {
      const response = await api.post("/api/admin/refresh");

      setAccessToken(response.data.accessToken);
      setUser(response.data.admin);

      return true;
    } catch (error) {
      console.error(
        "Refresh login failed:",
        error.response?.data || error.message
      );

      setAccessToken(null);
      setUser(null);

      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/admin/logout");
    } catch (error) {
      console.error(
        "Logout error:",
        error.response?.data || error.message
      );
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      await refreshLogin();
      setLoading(false);
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        refreshLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};