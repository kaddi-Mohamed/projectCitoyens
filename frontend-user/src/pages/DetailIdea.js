import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Hestory from "../components/Hestory";
import SinglIdea from "../components/SinglIdea";
import Comments from "../components/Comment";
import IdeaVideo from "../components/IdeaVideo";
import {
  getPublicIdeaById,
  getUserLike,
  likeIdea,
} from "../service/ideaService";
import { Button } from "react-bootstrap";
import FavoriteBtn from "../components/FavoriteBtn";
const DetailIdea = () => {
  const navigate = useNavigate();
  const { ideaId } = useParams();
  const [idea, setIdea] = useState({});
  const [isIdeaLiked, setIsIdeaLiked] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleLikes = async (id) => {
    likeIdea(id)
      .then((res) => setRefresh(!refresh))
      .catch((error) => {
        if (error.response.data === "Invalid token") return navigate("/login");
      });
  };

  const openNewPlatform = (idea) => {
    window.open(idea.urlDiscution, "_blank");
  };

  useEffect(() => {
    const fetchIdea = async (id) => {
      const res = await getPublicIdeaById(id);
      if (res) {
        setIdea(res);
      }
    };

    fetchIdea(ideaId);

    const fetchIdeaLike = async (id) => {
      const res = await getUserLike(ideaId);
      if (res) {
        setIsIdeaLiked(res.length !== 0);
      }
    };

    fetchIdeaLike(ideaId);
  }, [ideaId, refresh]);

  return (
    <main id="main">
      <section className="single-post-content">
        <div className="container">
          <div className="row">
            <div className="col-md-9 post-content">
              <div className="row gy-2">
                <div className="col-12">
                  {idea && <SinglIdea idea={idea} />}
                </div>
                <div className="col-md-12">
                  {idea.urlVideo && (
                    <h4 className="text-info px-3 py-2 border-bottom boder-dark">
                      vidéo :
                    </h4>
                  )}
                  {idea.urlVideo && <IdeaVideo idea={idea} />}
                </div>
                <div className="col-md-12  border-bottom border-danger rounded py-2">
                  <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-4">
                      <button
                        className="btn btn-sm border-danger w-75"
                        onClick={() => handleLikes(idea._id)}
                      >
                        <div className={`${isIdeaLiked && "text-danger"}`}>
                          <i className="fa-solid fa-heart"></i>
                        </div>
                      </button>
                      <strong className="mx-4">{idea.like}</strong>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-4">
                      {idea._id && <FavoriteBtn ideaId={idea._id} />}
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4 mt-3 mt-md-0">
                      {idea.urlDiscution && (
                        <Button
                          className="btn btn-success btn-sm w-100 mb-1"
                          onClick={() => openNewPlatform(idea)}
                        >
                          join us <i className="fa-solid fa-video mx-2"></i>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  {idea._id && <Comments ideaId={idea._id} />}
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-4">
              <div className="py-4 mt-4">
                {idea._id && <Hestory ideaId={idea._id} />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DetailIdea;
