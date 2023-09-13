import axios from "axios";
import { getHeaders } from "./authService";
import { API_BASE_URL } from "utils/const";

export const getAllHistorical = async (ideaId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/historical/${ideaId}`, {
      headers: getHeaders(),
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
export const deleteHistoricalById = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/historical/${id}`, {
      headers: getHeaders(),
    });
    return response.data; // Return the response data
  } catch (error) {
    console.log(error); // Throw an error with the error message
  }
};
