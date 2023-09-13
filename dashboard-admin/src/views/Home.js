import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Home() {
  return (
    <>
      <Container fluid>
        <img
          className="img-fluid"
          src={require("../assets/img/ideaLogo.jpg")}
          alt="Your Image Alt Text"
        />
      </Container>
    </>
  );
}

export default Home;
