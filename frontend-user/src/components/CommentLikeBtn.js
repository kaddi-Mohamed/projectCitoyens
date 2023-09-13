import React, { useEffect, useState } from "react";
import {
  addlike,
  getCommentaireById,
  getUserCommentLike,
} from "../service/commentService";

const CommentLikeBtn = ({ commentId, commentlike }) => {
  const [refresh, setRefresh] = useState(false);
  const [comment, setComment] = useState({});
  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const handleLike = async (id) => {
    addlike(id)
      .then((res) => setRefresh(!refresh))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCommentaireById(commentId)
      .then((res) => setComment(res.data))
      .catch((err) => console.log("error", err));

    const fetch = async (id) => {
      const res = await getUserCommentLike(commentId);
      return setIsCommentLiked(res.length !== 0);
    };
    fetch(commentId);
  }, [refresh, commentId]);
  return (
    <div className="row">
      <div className="col-md-2">
        <button
          className="btn btn-sm py-0 mx-2"
          onClick={() => handleLike(commentId)}
        >
          <div className={`${isCommentLiked && "text-danger"}`}>
            <i class="fa-solid fa-heart"></i>
          </div>
        </button>
      </div>
      <div className="col-md-2 mx-3">{comment.likes}</div>
    </div>
  );
};

export default CommentLikeBtn;
