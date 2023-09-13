import React, { useEffect, useState } from "react";
import {
  addIdeaToFavorites,
  getFavoriteIdeaById,
} from "../service/favoriteService";
import { useNavigate } from "react-router-dom";

const FavoriteBtn = ({ ideaId }) => {
  const navigate = useNavigate();
  const [isInFavorite, setIsInFavorite] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const handleFavorite = async (id) => {
    addIdeaToFavorites(id)
      .then((res) => {
        console.log(res);
        setRefresh(!refresh);
      })
      .catch((error) => {
        if (error.response.data === "Invalid token") return navigate("/login");
        console.log("error", error);
      });
  };

  useEffect(() => {
    getFavoriteIdeaById(ideaId)
      .then((res) => setIsInFavorite(true))
      .catch((error) => setIsInFavorite(false));
  }, [refresh, ideaId]);

  return (
    <button
      className="btn  btn-sm border-danger w-100"
      onClick={() => handleFavorite(ideaId)}
    >
      <div className="row">
        <div className=" col-md-6 ">Favoris</div>
        <div className={`col-md-6 ${isInFavorite && "text-warning"}`}>
          <i className="fa-solid fa-star "></i>
        </div>
      </div>
    </button>
  );
};

export default FavoriteBtn;
