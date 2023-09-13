import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { BsTicketDetailedFill } from "react-icons/bs";
import Swal from "sweetalert2";
import "./myAllIdea.css";
import { formatDate, truncateTitle } from "../../utils/formate_text";
import {
  deleteFromFavorite,
  getAllfavorites,
} from "../../service/favoriteService";
import NotIdeaFound from "../NotIdeaFound";
import { BASE_URL_IMG } from "../../Constants";
function FavoriteIdea() {
  const [favorite, setFavorite] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getUserFavorite = async () => {
      const res = await getAllfavorites();
      setFavorite(res);
    };
    getUserFavorite();
  }, [refresh]);

  const deleteFavorite = async (id) => {
    const result = await Swal.fire({
      title: "Voulez-vous enregistrer les modifications?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "confirmer",
      denyButtonText: `Don't save`,
    });
    if (result.isConfirmed) {
      deleteFromFavorite(id)
        .then((res) => {
          Swal.fire("Idée supprimée des favoris !", "", "success");
          return setRefresh(!refresh);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      {favorite.length === 0 ? (
        <NotIdeaFound message="you don't have favorite idea" />
      ) : (
        <div className="App mt-3 ">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center display-5 border-3 border-bottom text-success">
              Idées favorites
            </div>
            <div className="col-md-12">
              {favorite.map((item) => {
                return (
                  <section className="">
                    <div className="container ">
                      <div
                        className="h1 text-center text-dark"
                        id="pageHeaderTitle"
                      ></div>
                      <article className="postcard light blue">
                        <img
                          className="postcard__img"
                          src={BASE_URL_IMG + item.idea?.ideaImage}
                          alt="..."
                        />
                        <div className="postcard__text t-dark">
                          <h1 className="postcard__title blue">
                            <div>{item.idea.designation}</div>
                          </h1>
                          <div className="postcard__subtitle small">
                            <time datetime="2020-05-25 12:00:00">
                              <i className="fas fa-calendar-alt mr-2"></i>
                              {formatDate(item.idea.datePublication)}
                            </time>
                          </div>
                          <div className="postcard__bar"></div>
                          <div
                            title={item.idea.longDescription}
                            className="postcard__preview-txt"
                          >
                            {truncateTitle(item.idea.longDescription, 40)}
                          </div>
                          <Row className="mt-3 w-75">
                            <Col sm={4} className="">
                              <Button
                                href={`/detail/${item.idea._id}`}
                                className="mx-2 mb-2  my-0  btn btn-sm "
                                variant="outline-success"
                              >
                                Détail{" "}
                                <BsTicketDetailedFill
                                  style={{ fontSize: "20px" }}
                                />
                              </Button>
                            </Col>
                            <Col sm={5}>
                              <Button
                                className="mx-2 mb-2  btn my-0 btn-sm"
                                variant="outline-danger"
                                onClick={() => deleteFavorite(item.idea._id)}
                              >
                                Unfavorite
                                <MdDelete style={{ fontSize: "18px" }} />
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      </article>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default FavoriteIdea;
