import "bootstrap/dist/css/bootstrap.min.css";
import { MdAccountCircle } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { useEffect, useState } from "react";

import authService from "../service/authService";
function Header() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    authService.getUser().then((res) => setUser(res.data));
  }, []);
  return (
    <Navbar
      bg="light"
      expand="lg"
      style={{ width: "100%", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.25)" }}
    >
      <Container fluid>
        <Navbar.Brand href="/">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-2 "
            navbarScroll
            style={{ marginLeft: "200px" }}
          >
            <Nav.Link href="/" style={{ color: "black", fontWeight: "bold" }}>
              Réalisons Souss Massa
            </Nav.Link>
            <Form>
              <Button
                variant="outline-success"
                href="/ajouterIdee"
                style={{ fontWeight: "bold" }}
              >
                Ajouter nouvelle idée
              </Button>
            </Form>
          </Nav>
          {authService.getCurrentUserToken() && user ? (
            <Nav>
              <Nav.Link href="/account">
                <MdAccountCircle style={{ width: "40px", height: "40px" }} />
                {user.firstName} {user.lastName}
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="inscription">
              <Nav.Link
                href="/login"
                style={{ color: "black", fontWeight: "bold" }}
              >
                Se connecter
              </Nav.Link>
              <Nav.Link
                href="/signup"
                style={{ color: "black", fontWeight: "bold" }}
              >
                S'inscrire
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
