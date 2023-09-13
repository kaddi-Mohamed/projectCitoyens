import axios from "axios";
import React, { useEffect, useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { getHeaders } from "service/authService";
import userService from "service/userService";
import Swal from "sweetalert2";

function User() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const API_BASE_URL = "http://localhost:4000/api/v1";
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create an object with the form data
    const formData = {
      firstName,
      lastName,
      email,
      telephone,
      address,
      city,
    };
    // Send form data to backend using Axios
    userService
      .updateProfile(formData)
      .then((res) =>
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "you information has been saved",
          showConfirmButton: false,
          timer: 1500,
        })
      )
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make GET request to fetch user data
        const response = await axios.get(API_BASE_URL + "/user/me", {
          headers: getHeaders(),
        });
        const userData = response.data; // Assuming response data is in the format: { firstName, lastName, email, address, city }
        console.log(userData);
        //Set form fields with fetched user data
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setTelephone(userData.telephone);
        setAddress(userData.address);
        setCity(userData.city);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First Name"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Last Name"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Email address</label>
                        <Form.Control
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                          type="email"
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Telephone</label>
                        <Form.Control
                          value={telephone}
                          onChange={(e) => setTelephone(e.target.value)}
                          placeholder="Telephone"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Address</label>
                        <Form.Control
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Home Address"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="City"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-0.jpg")}
                    ></img>
                    <h5 className="title">{firstName + " " + lastName}</h5>
                  </a>
                  <p className="description">{email}</p>
                </div>
                <p className="description text-center">
                  {telephone} <br></br>
                  {city} <br></br>
                  {address}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
