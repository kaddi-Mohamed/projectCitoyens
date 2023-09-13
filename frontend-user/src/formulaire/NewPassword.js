import React from "react";
import "./formSignUp.css";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import validationSchema from "../hooks/ValidationLogin";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PREFIX } from "../Constants";

const NewPassword = () => {
  const navigate = useNavigate();
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post(
          PREFIX + "password/forgot-password",
          values,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    validationSchema,
  });
  const { password, confirmPassword } = formik.values;
  return (
    <div className="formulaire">
      <br />
      <h2 style={{ color: "#10350c", fontWeight: "bold", textAlign: "center" }}>
        Modifier le mot de passe
      </h2>
      <br></br>
      <h3
        className="mt-5"
        style={{ width: "50%", margin: "auto", textAlign: "center" }}
      >
        Vous avez oublié votre mot de passe? Entrez votre e-mail et nous vous
        enverrons un lien de réinitialisation
      </h3>
      <br />
      <br />
      <div className="d-flex justify-content-center align-items-center vh-80">
        <Form style={{ width: "380px" }} onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{ display: "block", textAlign: "left" }}>
              Mot de passe<small className="text-danger">*</small>
            </Form.Label>
            <Form.Control
              type="text"
              name="password"
              value={password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && (
              <span className="text-danger"> {formik.errors.password}</span>
            )}
          </Form.Group>
          <br />
          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{ display: "block", textAlign: "left" }}>
              Confirmer le mot de passe<small className="text-danger">*</small>
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && (
              <span className="text-danger"> {formik.errors.password}</span>
            )}
          </Form.Group>

          <Nav className="inscription">
            <Nav.Link
              href="/forgetPassword"
              className="text-success d-block text-left font-weight-bold"
            >
              mot de passe oublié
            </Nav.Link>
          </Nav>
          <br></br>
          <Button
            style={{ display: "block", textAlign: "center" }}
            variant="info"
            type="submit"
            className="font-weight-bold w-100 h-25 fs-4"
          >
            Réinitialiser
          </Button>
        </Form>
      </div>
      <br></br>
      <br></br>
      <p></p>
    </div>
  );
};

export default NewPassword;
