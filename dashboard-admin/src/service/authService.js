import axios from "axios";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import { API_BASE_URL } from "utils/const";

export const token = localStorage.getItem("adminToken");

export const logout = () => {
  localStorage.removeItem("adminToken");
};
export const getHeaders = () => {
  if (token)
    return {
      "Content-Type": "application/json",
      " x-auth-token ": token,
    };
  return {};
};
export const login = async (email, password) => {
  const response = await axios.post(API_BASE_URL + "/auth/login", {
    email: email,
    password: password,
  });
  return response;
};

export const checkTokenExpiration = () => {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    return true;
  }
  const decodedToken = jwt_decode(token);
  const expiryTime = decodedToken.exp;
  const currentTime = Date.now() / 1000; // convert to seconds
  if (currentTime > expiryTime) {
    Swal.fire({
      position: "top-center",
      icon: "warning",
      title: "Votre session expire bientôt. Veuillez vous connecter de nouveau",
      showConfirmButton: false,
      timer: 1700,
    });
    logout();
    setTimeout(() => {
      window.location.reload();
    }, 1700);
    return true;
  }
  return false;
};
