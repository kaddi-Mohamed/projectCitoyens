import axios from "axios";
import authService from "./authService";
import { PREFIX } from "../Constants";

export const updateIdea = async (id, formData) => {
  try {
    await axios.put(`${PREFIX}idea/update/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${authService.getCurrentUserToken()}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserIdea = async (id) => {
  try {
    const res = await axios.get(`${PREFIX}idea/userIdea/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
    });
    return res.data[0];
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
  }
};
/// idea service :

export const likeIdea = async (id) => {
  const res = await axios.post(
    `${PREFIX}idea/${id}/like`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
    }
  );
  return res;
};

export const getUserLike = async (id) => {
  const res = await axios.get(`${PREFIX}like/idea/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": `${localStorage.getItem("token")}`,
    },
  });

  return res.data;
};

export const getPublicIdeaById = async (id) => {
  try {
    const res = await axios.get(`${PREFIX}idea/all/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data[0];
  } catch (error) {
    console.log("error getting ideas: ", error);
    return null;
  }
};
export const getPublicIdeas = async () => {
  try {
    const response = await axios.get(`${PREFIX}idea/publicIdea`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const IditeImage = async (id, IdeaImage) => {
  try {
    const formData = new FormData();
    formData.append("image", IdeaImage);

    const res = await axios.post(PREFIX + `idea/update/${id}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
    });
    console.log(res);
    // Handle success
  } catch (error) {
    // Handle error
    console.log(error);
  }
};
