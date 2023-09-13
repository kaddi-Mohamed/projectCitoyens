import { Container, Nav, Col, Card, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GrDocumentConfig } from "react-icons/gr";
import { GiTeamIdea } from "react-icons/gi";
import { AiOutlineStar } from "react-icons/ai";
import { GrSecure } from "react-icons/gr";
import { VscDebugDisconnect } from "react-icons/vsc";
import { MdOutlineAccountBox } from "react-icons/md";
import authService from "../../service/authService";
import { PREFIX } from "../../Constants";
function Account() {
  const [user, setUser] = useState([]);
  const handleLogout = () => {
    authService.logout();
  };
  const getUser = async () => {
    const res = await axios.get(`${PREFIX}user/me`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
    });
    setUser(res.data);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <Container
        className=" p-4 bg-light rounded mt-5 text-center"
        style={{ maxWidth: "80vw" }}
      >
        <Card.Header>
          <Nav className="navbar">
            <Nav.Link
              href="/updateAccount"
              style={{
                fontSize: "18px",
                color: "black",
                marginBottom: "10px",
                display: "block",
                textAlign: "left",
              }}
            >
              <GrDocumentConfig /> Configurer mon compte
            </Nav.Link>
            <Nav.Link
              href="/myIdeas"
              style={{
                fontSize: "18px",
                color: "black",
                marginBottom: "10px",
                display: "block",
                textAlign: "left",
              }}
            >
              <GiTeamIdea /> Mes idées
            </Nav.Link>
            <Nav.Link
              href="/myFavoris"
              style={{
                fontSize: "18px",
                color: "black",
                marginBottom: "10px",
                display: "block",
                textAlign: "left",
              }}
            >
              <AiOutlineStar /> Mes favoris
            </Nav.Link>
            <Nav.Link
              href={`/resetPassword/${user._id}`}
              style={{
                fontSize: "18px",
                color: "black",
                marginBottom: "10px",
                display: "block",
                textAlign: "left",
              }}
            >
              <GrSecure /> Sécurité
            </Nav.Link>
          </Nav>
        </Card.Header>
        <Row className="justify-content-center  ">
          <Col className="mt-4 text-left " md={6}>
            <Card className="mb-3 bg-light">
              <Card.Body>
                <Row>
                  <Col sm={3}>
                    <h6 className="mb-0">Nom</h6>
                  </Col>
                  <Col sm={9} className="text-secondary">
                    {user.firstName}
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <h6 className="mb-0">Prénom</h6>
                  </Col>
                  <Col sm={9} className="text-secondary">
                    {user.lastName}
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <h6 className="mb-0">Email</h6>
                  </Col>
                  <Col sm={9} className="text-secondary">
                    {user.email}
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <h6 className="mb-0">Téléphone</h6>
                  </Col>
                  <Col sm={9} className="text-secondary">
                    {user.telephone}
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <h6 className="mb-0">Ville</h6>
                  </Col>
                  <Col sm={9} className="text-secondary">
                    {user.city}
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <h6 className="mb-0">Adresse</h6>
                  </Col>
                  <Col sm={9} className="text-secondary">
                    {user.address}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mt-4 d-flex justify-content-center" md={6}>
            <Nav className="flex-column mt-5">
              <div className="d-flex justify-content-center ">
                <MdOutlineAccountBox
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <strong className="d-flex justify-content-center mt-2 mb-2">
                {user.firstName + " " + user.lastName}
              </strong>
              <Nav.Link
                href="/login"
                onClick={handleLogout}
                style={{
                  fontSize: "18px",
                  color: "black",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  display: "block",
                  textAlign: "left",
                }}
              >
                <VscDebugDisconnect /> Se déconnecter
              </Nav.Link>
            </Nav>
          </Col>
        </Row>

        <style>
          {`
            /* adjust font size for screens smaller than 576px */
            @media (max-width: 576px) {
              h6 {
                font-size: 12px;
              }
            }
            /* adjust font size for screens between 576px and 768px */
            @media (min-width: 576px) and (max-width: 768px) {
              h6 {
                font-size: 16px;
              }
            }
            /* adjust font size for screens larger than 768px */
            @media (min-width: 768px) {
              h6 {
                font-size: 16px;
              }
            }
          `}
        </style>
      </Container>
    </div>
  );
}

export default Account;
