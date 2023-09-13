import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const NotIdeaFound = ({ message }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${require("../assets/img/pexels-shvets-production-7203722.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Container>
        <Row>
          <Col>
            <h1 className="text-dark">{message}</h1>
            <p>Please check back later.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotIdeaFound;
