import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import validationSchema from "../hooks/ValidationIdea";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PREFIX } from "../Constants";

const IdeaForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const initialValues = {
    designation: "",
    smallDescription: "",
    longDescription: "",
    image: null,
    urlVideo: "",
    activitySector: "",
    city: "",
    neighborhood: "",
  };

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,

    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("designation", values.designation);
        formData.append("smallDescription", values.smallDescription);
        formData.append("longDescription", values.longDescription);
        formData.append("image", values.image);
        formData.append("urlVideo", values.urlVideo);
        formData.append("neighborhood", values.neighborhood);
        formData.append("activitySector", values.activitySector);
        formData.append("city", values.city);
        const response1 = await axios.post(`${PREFIX}idea`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": `${localStorage.getItem("token")}`,
          },
        });
        console.log(response1.data);
        setShowAlert(true);
        navigate("/allIdea");
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    validationSchema,
  });
  const {
    designation,
    smallDescription,
    longDescription,
    image,
    urlVideo,
    activitySector,
    city,
    neighborhood,
  } = formik.values;
  return (
    <div className="formulaire">
      <h2
        className="mt-3"
        style={{ color: "#10350c", fontWeight: "bold", textAlign: "center" }}
      >
        Ajouter votre nouvelle idée
      </h2>

      <p className="mt-4" style={{ marginBotom: "60px", textAlign: "center" }}>
        Tous les champs marqués d’un astérisque (*) sont obligatoires
      </p>
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          Form submitted successfully!
        </Alert>
      )}
      <div>
        <Container className=" bg-light rounded w-75">
          <Form className="" onSubmit={formik.handleSubmit}>
            <div className="row mb-5 d-flex justify-content-center align-items-center ">
              <Row className="mt-3 w-75">
                <Col md={6} className="">
                  <Form.Group controlId="formBasicNom" className="mb-3 ml-5">
                    <Form.Label
                      style={{
                        display: "block",
                        textAlign: "left",
                        fontSize: "20px",
                      }}
                    >
                      Designation<small>*</small>
                    </Form.Label>
                    <Form.Control
                      className=""
                      placeholder="designation"
                      type="text"
                      name="designation"
                      value={designation}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.designation && (
                      <span className="text-danger">
                        {" "}
                        {formik.errors.designation}
                      </span>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    controlId="formBasicSmallDescription"
                    className="mb-3"
                  >
                    <Form.Label
                      style={{
                        display: "block",
                        textAlign: "left",
                        fontSize: "20px",
                      }}
                    >
                      Courte description<small>*</small>
                    </Form.Label>
                    <Form.Control
                      placeholder="écrire une Courte description"
                      type="text"
                      name="smallDescription"
                      value={smallDescription}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.smallDescription && (
                      <span className="text-danger">
                        {" "}
                        {formik.errors.smallDescription}
                      </span>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-2 w-75">
                <Col md={6}>
                  <Form.Group controlId="formLongDescription" className="mb-3">
                    <Form.Label
                      style={{
                        display: "block",
                        textAlign: "left",
                        fontSize: "20px",
                      }}
                    >
                      Long description<small>*</small>
                    </Form.Label>
                    <Form.Control
                      placeholder="écrire une longue description"
                      as="textarea"
                      style={{ height: "80px" }}
                      name="longDescription"
                      value={longDescription}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.longDescription && (
                      <span className="text-danger">
                        {" "}
                        {formik.errors.longDescription}
                      </span>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formBasicGalerieImage">
                    <Form.Label
                      style={{
                        display: "block",
                        textAlign: "left",
                        fontSize: "20px",
                      }}
                    >
                      Image<small>*</small>
                    </Form.Label>
                    <Form.Control
                      type="file"
                      name="image"
                      onChange={(event) => {
                        formik.setFieldValue(
                          "image",
                          event.currentTarget.files[0]
                        );
                      }}
                    />
                    {formik.errors.image && (
                      <span className="text-danger">
                        {" "}
                        {formik.errors.image}
                      </span>
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
                    <Form.Label
                      style={{
                        display: "block",
                        textAlign: "left",
                        fontSize: "20px",
                      }}
                    >
                      Vidéo
                    </Form.Label>
                    <Form.Control
                      placeholder="url de vidéo"
                      type="url"
                      name="urlVideo"
                      value={urlVideo}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.urlVideo && (
                      <span className="text-danger">
                        {" "}
                        {formik.errors.urlVideo}
                      </span>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    controlId="formBasicActivitySector"
                    className="mb-3 mt-3"
                  >
                    <Form.Label
                      style={{
                        display: "block",
                        textAlign: "left",
                        fontSize: "20px",
                      }}
                    >
                      Secteur d'activité<small>*</small>
                    </Form.Label>
                    <Form.Control
                      placeholder="secteur d'activité"
                      type="text"
                      name="activitySector"
                      value={activitySector}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.activitySector && (
                      <span className="text-danger">
                        {" "}
                        {formik.errors.activitySector}
                      </span>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-2 w-75">
                <Col md={6}>
                  <Form.Group controlId="formBasicCity" className="mb-3">
                    <Form.Label
                      style={{
                        display: "block",
                        textAlign: "left",
                        fontSize: "20px",
                      }}
                    >
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
                <Col md={6}>
                  <Form.Group controlId="formBasicNeighborhood">
                    <Form.Label
                      style={{
                        display: "block",
                        textAlign: "left",
                        fontSize: "20px",
                      }}
                    >
                      Quartier
                    </Form.Label>
                    <Form.Control
                      placeholder="quartier"
                      type="text"
                      name="neighborhood"
                      value={neighborhood}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.neighborhood && (
                      <span className="text-danger">
                        {" "}
                        {formik.errors.neighborhood}
                      </span>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </div>
            <Button
              style={{ fontSize: "20   px", margin: "auto" }}
              variant="info"
              type="submit"
              className="mb-4 font-weight-bold w-70 h-15 fs-5"
            >
              Enregistrer
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default IdeaForm;
