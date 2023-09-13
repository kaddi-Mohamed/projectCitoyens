import { Outlet, Navigate } from "react-router-dom";
// import authService from "../service/authService";
// authService.getCurrentUserToken()
const PrivateRoutes = () => {
  return true ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
