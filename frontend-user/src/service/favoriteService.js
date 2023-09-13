import axios from "axios";
import { PREFIX } from "../Constants";

export const getAllfavorites = async () => {
  const res = await axios.get(`${PREFIX}favorite`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": `${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

export const deleteFromFavorite = async (id) => {
  const res = await axios.delete(`${PREFIX}favorite/${id}`, {
    headers: { "x-auth-token": `${localStorage.getItem("token")}` },
  });
  return res;
};
export const addIdeaToFavorites = async (id) => {
  const res = await axios.post(
    `${PREFIX}favorite/${id}`,
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

export const getFavoriteIdeaById = (id) => {
  const res = axios.get(`${PREFIX}favorite/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": `${localStorage.getItem("token")}`,
    },
  });
  return res;
};
