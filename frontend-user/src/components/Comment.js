import React, { useEffect, useState } from "react";
import { formatDate } from "../utils/formate_text";
import authService from "../service/authService";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import CommentLikeBtn from "./CommentLikeBtn";
import {
  createComment,
  deleteComment,
  getAllCommentByIdea,
} from "../service/commentService";

function Comment({ ideaId }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [refresh, setRefresh] = useState(false);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Supprimer le commentaire ?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "comfermer",
      denyButtonText: `Don't save`,
    });
    if (result.isConfirmed) {
      deleteComment(id)
        .then((res) => {
          Swal.fire("Le commentaire a été supprimé.", "", "success");
          return setRefresh(!refresh);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = async (id) => {
    await createComment(id, commentText);
    setCommentText("");
    setRefresh(!refresh);
  };

  useEffect(() => {
    const getIdeaComments = async (ideaId) => {
      const res = await getAllCommentByIdea(ideaId);
      setComments(res);
    };
    getIdeaComments(ideaId);
  }, [ideaId, refresh]);

  return (
    <>
      <div className="comments">
        <h5 className="comment-title">Commentaires :</h5>
        <div className="bg-light rounded-2">
          {comments.map((comment) => {
            return (
              <div className="comment p-3 border border-dark mt-1 rounded  d-flex">
                <div className="flex-shrink-0"></div>
                <div className="flex-shrink-1 ms-2 ms-sm-3">
                  <div className="comment-meta d-flex">
                    <span className="text-muted">
                      <i className="far fa-user mx-2"></i>
                      {comment.author &&
                        comment.author.firstName +
                          " " +
                          comment.author.lastName}
                    </span>
                    <span className="text-muted">
                      <i className="far fa-calendar-alt mx-2"></i>
                      {formatDate(comment.date)}
                    </span>

                    <div className="row">
                      <div className="col-md-8">
                        {comment._id && (
                          <CommentLikeBtn commentId={comment._id} />
                        )}
                      </div>
                      <div className="col-md-4">
                        {authService.currentUserId() === comment.author._id && (
                          <button
                            className="btn btn-sm py-0 mx-2"
                            onClick={() => handleDelete(comment._id)}
                          >
                            <div className="text-danger">
                              <i className="fa-solid fa-xmark"></i>
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="comment-body mb-2">{comment.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {authService.getCurrentUserToken() && (
        <div className="row justify-content-center mt-5">
          <div className="col-lg-12">
            <div className="row">
              <form onSubmit={handleSubmit}>
                <div className="col-6 mb-3">
                  <label htmlFor="comment-message">
                    <i className="fas fa-comment">Comments</i>
                  </label>
                  <textarea
                    className="form-control"
                    id="comment-message"
                    placeholder="your comments here"
                    cols="50"
                    rows="4"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  ></textarea>
                </div>
                <div className="col-12">
                  <Button
                    onClick={() => handleSubmit(ideaId)}
                    className="btn btn-success btn-sm"
                  >
                    Post Comment
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Comment;
