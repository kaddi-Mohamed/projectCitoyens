import React from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import validationSchema from "../hooks/ValidationForgetPassword";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { PREFIX } from "../Constants";

const MotPasseOublie = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post(
          `${PREFIX}password/forgot-password`,
          values,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(response);
        window.alert(response.data.message);
        navigate("/motPasseOublie2");
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema,
  });
  const { email } = formik.values;
  return (
    <div className="formulaire">
      <br />
      <h4
        style={{
          color: "#10350c",
          fontWeight: "bold",
          marginTop: "3%",
          textAlign: "center",
        }}
      >
        Réinitialiser votre mot de passe
      </h4>
      <br></br>

      <div className="d-flex justify-content-center align-items-center vh-80 mt-5">
        <Form
          style={{ width: "380px" }}
          onSubmit={formik.handleSubmit}
          message="Vérifier votre email"
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{ display: "block", textAlign: "left" }}>
              email<small className="text-danger">*</small>
            </Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && (
              <span className="text-danger"> {formik.errors.email}</span>
            )}
          </Form.Group>
          <br></br>
          <Button
            style={{ display: "block", textAlign: "center" }}
            variant="info"
            type="submit"
            className="font-weight-bold w-100 h-25 fs-4"
          >
            Envoyer
          </Button>
        </Form>
      </div>
      <br></br>
      <br></br>
      <p></p>
    </div>
  );
};

export default MotPasseOublie;
