import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { user, accessToken, logout, setUser } = useAuthStore();
  const navigate = useNavigate();

  const isAuthenticated = !!accessToken;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return { user, isAuthenticated, handleLogout, setUser };
};
