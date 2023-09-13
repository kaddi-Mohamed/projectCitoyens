import axios from "axios";
import { getHeaders } from "./authService";
import { API_BASE_URL } from "utils/const";

export const getCommentCount = async () => {
  try {
    const response = await axios.get(API_BASE_URL + "/comments/count", {
      headers: getHeaders(),
    });
    return response.data.count;
  } catch (error) {
    console.error(error);
  }
};

const commentService = {
  getCommentCount,
};

export default commentService;
