import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { PREFIX } from "../Constants";
//auto logout user afther token expire
const notify = () =>
  toast("Votre session expire bientôt. Veuillez vous connecter de nouveau");
const checkTokenExpiration = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return true;
  }
  const decodedToken = jwt_decode(token);
  const expiryTime = decodedToken.exp;
  const currentTime = Date.now() / 1000; // convert to seconds
  if (currentTime > expiryTime) {
    authService.logout();
    notify();
    return true;
  }
  return false;
};

const currentUserId = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwt_decode(token);
    return decodedToken._id;
  }
};

const login = async (values) => {
  const res = await axios.post(PREFIX + "auth/login", values, {
    headers: { "Content-Type": "application/json" },
  });
  return res;
};

const logout = () => {
  localStorage.removeItem("token");
};

const getCurrentUserToken = () => {
  return localStorage.getItem("token");
};

const getUser = async () => {
  try {
    const res = await axios.get(`${PREFIX}user/me`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${authService.getCurrentUserToken()}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

const singup = async (values) => {
  const response = await axios.post(`${PREFIX}user/signUp`, values, {
    headers: { "Content-Type": "application/json" },
  });
  return response;
};
const authService = {
  currentUserId,
  singup,
  getUser,
  login,
  logout,
  getCurrentUserToken,
  checkTokenExpiration,
};

export default authService;
