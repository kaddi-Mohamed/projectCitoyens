import { Outlet, Navigate } from "react-router-dom";
import authService from "../service/authService";

const PrivateRoutes = () => {
  return authService.getCurrentUserToken() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
