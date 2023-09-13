import axios from "axios";
import { getHeaders } from "./authService";
import { API_BASE_URL } from "utils/const";

const getIdeaData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/idea/sendedIdea`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching idea data:", error);
  }
};

export const updateIdea = async (ideaId, updatedIdeaData) => {
  const response = await axios.put(
    `${API_BASE_URL}/idea/send/${ideaId}`,
    updatedIdeaData,
    {
      headers: getHeaders(),
    }
  );
  return response;
};
export const getIdeaById = async (ideaId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/idea/sendedIdea/${ideaId}`,
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get idea by ID:", error);
  }
};

const getIdeaCount = async () => {
  try {
    const response = await axios.get(API_BASE_URL + "/idea/sended/count", {
      headers: getHeaders(),
    });
    return response.data.count;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user count");
  }
};

const getIdeaCountByStatus = async (status) => {
  try {
    const response = await axios.get(
      API_BASE_URL + `/idea/sended/status/count?status=${status}`,
      {
        headers: getHeaders(),
      }
    );
    return response.data.count;
  } catch (error) {
    console.error(error);
  }
};

const addUrlDiscutionToIdea = async (ideaId, urlDiscution, dateDiscution) => {
  const response = await axios.put(
    API_BASE_URL + "/idea/" + ideaId + "/urlDiscution",
    { urlDiscution: urlDiscution, dateDiscution: dateDiscution },
    {
      headers: getHeaders(),
    }
  );
  return response;
};
const ideaService = {
  addUrlDiscutionToIdea,
  getIdeaCount,
  getIdeaById,
  updateIdea,
  getIdeaData,
  getIdeaCountByStatus,
};

export default ideaService;
