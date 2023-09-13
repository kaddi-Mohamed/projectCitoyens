import axios from "axios";
import authService from "./authService";
import { PREFIX } from "../Constants";

export const getAllHistorical = async (ideaId) => {
  try {
    const response = await axios.get(`${PREFIX}historical/${ideaId}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-auth-token": `${authService.getCurrentUserToken()}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to get historical data");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
