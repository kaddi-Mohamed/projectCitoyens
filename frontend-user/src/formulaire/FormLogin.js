import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import validationSchema from "../hooks/ValidationLogin";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import authService from "../service/authService";
import Swal from "sweetalert2";

const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      authService
        .login(values)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          navigate("/");
          return window.location.reload();
        })
        .catch((error) =>
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: error.response.data.error || error.response.data.message,
            showConfirmButton: false,
            timer: 1500,
          })
        );
      formik.resetForm();
    },
    validationSchema,
  });
  const { email, password } = formik.values;
  return (
    <div className="formulaire">
      <br />
      <h2 style={{ color: "#10350c", fontWeight: "bold", textAlign: "center" }}>
        Se connecter
      </h2>
      <br></br>

      <div className="d-flex justify-content-center align-items-center vh-80">
        <Form style={{ width: "380px" }} onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label
              style={{ display: "block", textAlign: "left", fontSize: "20px" }}
            >
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
          <br />
          <Form.Group controlId="formBasicPassword">
            <Form.Label
              style={{ display: "block", textAlign: "left", fontSize: "20px" }}
            >
              Mot de passe<small className="text-danger">*</small>
            </Form.Label>
            <div style={{ position: "relative" }}>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={formik.handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {showPassword ? (
                  <AiFillEye size={22} />
                ) : (
                  <AiFillEyeInvisible size={22} />
                )}
              </button>
            </div>
          </Form.Group>

          <Nav className="inscription">
            <Nav.Link
              href="/forgetPassword"
              className="text-success d-block text-left font-weight-bold"
            >
              mot de passe oublié
            </Nav.Link>
          </Nav>
          <br />
          <br></br>
          <Button
            style={{ display: "block", textAlign: "center" }}
            variant="info"
            type="submit"
            className="font-weight-bold w-100 h-25 fs-4"
          >
            Se connecter
          </Button>
          <br />
          <br />
          <Nav className="inscription">
            <p>
              pour vous pouvez partager votre propre idée veillez
              <Nav.Link
                href="/signUp"
                className="text-success"
                style={{
                  display: "block",
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                créer un nouveau compte
              </Nav.Link>
            </p>
          </Nav>
        </Form>
      </div>
      <br></br>
      <br></br>
      <p></p>
    </div>
  );
};

export default FormLogin;
