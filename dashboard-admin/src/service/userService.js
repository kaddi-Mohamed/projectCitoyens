import axios from "axios";
import { getHeaders } from "./authService";
import { API_BASE_URL } from "utils/const";
const getAllUsers = async () => {
  try {
    const response = await axios.get(API_BASE_URL + "/user", {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const deleteUserById = async (userId) => {
  try {
    const response = await axios.delete(
      API_BASE_URL + "/user/delete/" + userId,
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getUserCount = async () => {
  try {
    const response = await axios.get(API_BASE_URL + "/user/count", {
      headers: getHeaders(),
    });
    return response.data.count;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user count");
  }
};
const getUserCountByEmailVerified = async (verified) => {
  try {
    const response = await axios.get(
      API_BASE_URL + `/user/verified/count?verified=${verified}`,
      {
        headers: getHeaders(),
      }
    );
    return response.data.count;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user count");
  }
};

async function getMostLikedIdea() {
  try {
    const response = await axios.get(API_BASE_URL + "/idea/most-liked-idea", {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error getting most liked idea:", error);
    throw error;
  }
}
async function signUpUser(user) {
  const res = await axios.post(`${API_BASE_URL}/user/signUp`, { ...user });
  return res;
}
async function updateProfile(formData) {
  const response = await axios.put(
    API_BASE_URL + "/user/updateProfile",
    formData,
    { headers: getHeaders() }
  );
  return response;
}

const userService = {
  updateProfile,
  getUserCountByEmailVerified,
  signUpUser,
  getMostLikedIdea,
  getUserCount,
  deleteUserById,
  getAllUsers,
};

export default userService;
