import React, { useEffect } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { useFormik } from "formik";
import validationSchema from "../hooks/ValidationUpdateUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PREFIX } from "../Constants";

const UpdateAccount = () => {
  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    city: "",
    address: "",
  };
  const formik = useFormik({
    initialValues,

    onSubmit: async (values) => {
      try {
        await axios.put(`${PREFIX}user/updateProfile`, values, {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${localStorage.getItem("token")}`,
          },
        });
        navigate("/account");
      } catch (error) {
        console.log(error);
      }
    },

    validationSchema,
  });
  const getUser = async () => {
    try {
      const res = await axios.get(`${PREFIX}user/me`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
      });
      formik.setValues(res.data);
    } catch (error) {
      // Gérez l'erreur ici, par exemple en affichant un message d'erreur ou en effectuant une action spécifique
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const { firstName, lastName, email, telephone, city, address } =
    formik.values;
  return (
    <div className="formulaire">
      <h4 className="text-center font-weight-bold text-success fw-bold mt-3 mb-4">
        Modifier les information d'utilisateur
      </h4>
      <p className="mt-4 mb-3 text-center">
        Tous les champs marqués d’un astérisque (*) sont obligatoires
      </p>
      <div className="d-flex justify-content-center align-items-center vh-120">
        <Container className=" bg-light rounded w-75">
          <Form onSubmit={formik.handleSubmit}>
            <div className="row mb-5 d-flex justify-content-center align-items-center ">
              <Row className="mt-3 w-75">
                <Col md={6}>
                  <Form.Group controlId="formBasicNom" className="mb-3 ml-5">
                    <Form.Label className="d-block text-left fs-5">
                      Nom<small>*</small>
                    </Form.Label>
                    <Form.Control
                      className=""
                      placeholder="firstName"
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.firstName && (
                      <span className="text-danger">
                        {" "}
                        {formik.errors.firstName}
                      </span>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    controlId="formBasicSmallDescription"
                    className="mb-3"
                  >
                    <Form.Label className="d-block text-left fs-5">
                      Prénom<small>*</small>
                    </Form.Label>
                    <Form.Control
                      placeholder="votre prénom"
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.lastName && (
                      <span className="text-danger">
                        {" "}
                        {formik.errors.lastName}
                      </span>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-2 w-75">
                <Col md={6}>
                  <Form.Group controlId="formLongDescription" className="mb-3">
                    <Form.Label className="d-block text-left fs-5">
                      Email<small>*</small>
                    </Form.Label>
                    <Form.Control
                      placeholder="écrire vtre email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.email && (
                      <span className="text-danger">
                        {" "}
                        {formik.errors.email}
                      </span>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    controlId="formBasicActivitySector"
                    className="mb-3 mt-3"
                  >
                    <Form.Label className="d-block text-left fs-5">
                      Ville<small>*</small>
                    </Form.Label>
                    <Form.Control
                      placeholder="ville"
                      type="text"
                      name="city"
                      value={city}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.city && (
                      <span className="text-danger"> {formik.errors.city}</span>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-2 w-75">
                <Col md={6} className=" mt-3">
                  <Form.Group
                    controlId="formBasicGalerieVideo"
                    className="mb-3"
                  >
                    <Form.Label className="d-block text-left fs-5">
                      Téléphone
                    </Form.Label>
                    <Form.Control
                      placeholder="téléphone"
                      type="tel"
                      name="telephone"
                      value={telephone}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.telephone && (
                      <span className="text-danger">
                        {" "}
                        {formik.errors.telephone}
                      </span>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formBasicCity" className="mb-3">
                    <Form.Label className="d-block text-left fs-5">
                      Adresse<small>*</small>
                    </Form.Label>
                    <Form.Control
                      placeholder="adresse"
                      type="text"
                      name="address"
                      value={address}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.address && (
                      <span className="text-danger">
                        {" "}
                        {formik.errors.address}
                      </span>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-2 w-75">
                <Col md={12}>
                  <Button
                    variant="info"
                    type="submit"
                    className="mb-3 font-weight-bold w-75 h-15 fs-5"
                  >
                    Enregistrer
                  </Button>
                </Col>
                <Col></Col>
              </Row>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default UpdateAccount;
