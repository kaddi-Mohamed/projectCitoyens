import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import validationSchema from "../hooks/ValidationForgetPassword2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { PREFIX } from "../Constants";

const MotPasseOublie = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    password: "",
    token: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post(
          `${PREFIX}password/reset-password`,
          values,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        window.alert(response.data.message);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema,
  });
  const { password, token } = formik.values;
  return (
    <div className="formulaire">
      <br />
      <h4 style={{ color: "#10350c", fontWeight: "bold", textAlign: "center" }}>
        Configuration d'un nouveau mot de passe
      </h4>
      <br></br>
      <h5 style={{ textAlign: "center" }}>
        le jeton est déja envoyer à votre email
      </h5>
      <br />
      <div className="d-flex justify-content-center align-items-center vh-80">
        <Form style={{ width: "380px" }} onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label
              style={{ display: "block", textAlign: "left", fontSize: "20px" }}
            >
              Nouveau mot de passe<small className="text-danger">*</small>
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
          <br />
          <Form.Group controlId="formBasicToken">
            <Form.Label
              style={{ display: "block", textAlign: "left", fontSize: "20px" }}
            >
              Jeton<small className="text-danger">*</small>
            </Form.Label>
            <Form.Control
              type="text"
              name="token"
              value={token}
              onChange={formik.handleChange}
            />
            {formik.errors.token && (
              <span className="text-danger"> {formik.errors.token}</span>
            )}
          </Form.Group>
          <br></br>
          <Button
            style={{ display: "block", textAlign: "center" }}
            variant="info"
            type="submit"
            className="font-weight-bold w-100 h-25 fs-4"
          >
            Cliquer
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
