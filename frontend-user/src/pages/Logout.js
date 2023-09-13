import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    console.log(localStorage.getItem("token"));
    return navigate("/login");
  }, [navigate]);
};
export default Logout;
