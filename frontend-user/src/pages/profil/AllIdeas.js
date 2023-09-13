import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import axios from "axios";
import { BsFillPencilFill, BsFillSendPlusFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { BsTicketDetailedFill } from "react-icons/bs";
import Swal from "sweetalert2";
import "./myAllIdea.css";
import { formatDate, truncateTitle } from "../../utils/formate_text";
import { IditeImage } from "../../service/ideaService";
import NotIdeaFound from "../NotIdeaFound";
import { BASE_URL_IMG, PREFIX } from "../../Constants";
function AllIdeas() {
  const [ideas, setIdeas] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getUserIdea = async () => {
    const res = await axios.get(`${PREFIX}idea/userIdea`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
    });
    setIdeas(res.data);
  };

  const deleteIdea = async (id) => {
    const result = await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "confirmer",
      denyButtonText: `Don't save`,
    });
    if (result.isConfirmed) {
      await axios.delete(`${PREFIX}idea/${id}`, {
        headers: { "x-auth-token": `${localStorage.getItem("token")}` },
      });
      setRefresh(true);
      Swal.fire("L'idée a été supprimée.", "", "success");
    }
  };

  const handleImageChange = async (event) => {
    try {
      const ideaId = event.target.dataset.ideaId; // retrieve the idea ID from the data attribute
      const selectedFile = event.target.files[0];
      await IditeImage(ideaId, selectedFile);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  const sendIdea = async (id) => {
    await axios.put(
      `${PREFIX}idea/sendIdea/${id}`,
      { null: null },
      {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    setRefresh(!refresh);
  };

  useEffect(() => {
    getUserIdea();
  }, [refresh]);

  return (
    <>
      {ideas.length === 0 ? (
        <NotIdeaFound message="not idea found" />
      ) : (
        <div className="mt-3">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center display-5 border-3 border-bottom text-success">
              Mes idées
            </div>
            <div className="col-md-12 mt-2">
              {ideas.map((idea) => {
                return (
                  <section className="">
                    <div className="container ">
                      <article className="postcard light blue h-25">
                        <img
                          className="postcard__img"
                          src={BASE_URL_IMG + idea.ideaImage}
                          alt="..."
                        />
                        <div className="postcard__text t-dark">
                          <h1 className="postcard__title blue">
                            {idea.designation}
                          </h1>
                          <div className="postcard__subtitle small">
                            <time datetime="2020-05-25 12:00:00">
                              <i className="fas fa-calendar-alt mr-2"></i>
                              {formatDate(idea.datePublication)}
                            </time>
                          </div>
                          <div className="postcard__bar"></div>
                          <div
                            title={idea.longDescription}
                            className="postcard__preview-txt"
                          >
                            {truncateTitle(idea.longDescription, 40)}
                          </div>
                          <div className="container">
                            <Row>
                              <Col sm={3}>
                                <Button
                                  className={`btn btn-sm w-100 ${
                                    idea.isSend && "d-none"
                                  } `}
                                  variant="outline-success"
                                  onClick={() => sendIdea(idea._id)}
                                >
                                  Envoyer <BsFillSendPlusFill />
                                </Button>
                              </Col>
                              <Col sm={3}>
                                <Button
                                  href={`/detail/${idea._id}`}
                                  className="btn btn-sm w-100"
                                  variant="outline-success"
                                >
                                  Détail <BsTicketDetailedFill />
                                </Button>
                              </Col>
                              <Col sm={3}>
                                <Button
                                  href={`/updateIdea/${idea._id}`}
                                  className={`btn btn-sm w-100 ${
                                    idea.isSend && "d-none"
                                  } `}
                                  variant="outline-success"
                                >
                                  Modifier <BsFillPencilFill />
                                </Button>
                              </Col>
                              <Col sm={3}>
                                <Button
                                  className={`btn btn-sm w-100 ${
                                    idea.isSend && "d-none"
                                  } `}
                                  variant="outline-danger"
                                  onClick={() => deleteIdea(idea._id)}
                                >
                                  Supprimer
                                  <MdDelete />
                                </Button>
                              </Col>
                            </Row>

                            {!idea.isSend && (
                              <Row className=" mt-2 d-flex align-items-center">
                                <Col md={2}>
                                  Edit Image <BsFillPencilFill />
                                </Col>
                                <Col md={10}>
                                  <input
                                    type="file"
                                    className="form-control w-100 rounded-3 border-success border-1"
                                    onChange={handleImageChange}
                                    data-idea-id={idea._id}
                                  />
                                </Col>
                              </Row>
                            )}
                            <Row>
                              <Col className="mt-2" md={9}>
                                {idea.isSend && (
                                  <Card.Footer className="text-muted text-center">
                                    Idée envoyée
                                  </Card.Footer>
                                )}
                              </Col>
                            </Row>
                          </div>
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
export default AllIdeas;
