import axios from "axios";
import { PREFIX } from "../Constants";

export const addlike = async (id) => {
  const res = await axios.post(
    `${PREFIX}comments/${id}/like`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};

export const getUserCommentLike = async (id) => {
  const res = await axios.get(`${PREFIX}like/comment/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": `${localStorage.getItem("token")}`,
    },
  });

  return res.data;
};

export const getCommentaireById = async (id) => {
  const res = await axios.get(`${PREFIX}comments/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": `${localStorage.getItem("token")}`,
    },
  });
  return res;
};

export const deleteComment = async (id) => {
  const res = await axios.delete(`${PREFIX}comments/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": `${localStorage.getItem("token")}`,
    },
  });
  return res;
};

export const createComment = async (id, commentText) => {
  const res = await axios.post(
    `${PREFIX}comments/${id}`,
    { text: commentText },
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
    }
  );
  return res;
};

export const getAllCommentByIdea = async (id) => {
  const res = await axios.get(`${PREFIX}comments/idea/${id}`);
  return res.data;
};
