import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import validationSchema from "../hooks/ValidationSignUp";
import axios from "axios";
import PREFIX from "../Constants";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import authService from "../service/authService";
import Swal from "sweetalert2";

const FormSignUp = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    telephone: "",
    city: "",
    address: "",
    gcu: false,
  };
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues,

    onSubmit: async (values) => {
      authService
        .singup(values)
        .then((res) =>
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1700,
          })
        )
        .catch((err) =>
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: err.response.data.error || err.response.data.message,
            showConfirmButton: false,
            timer: 1700,
          })
        );
      formik.resetForm();
    },

    validationSchema,
  });

  const {
    firstName,
    lastName,
    email,
    password,
    telephone,
    city,
    address,
    gcu,
  } = formik.values;
  return (
    <div className="formulaire">
      <br />
      <h2 style={{ color: "#10350c", fontWeight: "bold", textAlign: "center" }}>
        S'inscrire
      </h2>
      <br></br>
      <p style={{ marginBotom: "60px", textAlign: "center" }}>
        Tous les champs marqués d’un astérisque (*) sont obligatoires
      </p>
      <br></br>

      <div className="d-flex justify-content-center align-items-center vh-120">
        <Form style={{ width: "350px" }} onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formBasicNom">
            <Form.Label
              style={{ display: "block", textAlign: "left", fontSize: "20px" }}
            >
              Nom<small className="text-danger">*</small>
            </Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={firstName}
              onChange={formik.handleChange}
            />
            {formik.errors.firstName && (
              <span className="text-danger"> {formik.errors.firstName}</span>
            )}
          </Form.Group>
          <br />
          <Form.Group controlId="formBasicPrenom">
            <Form.Label
              style={{ display: "block", textAlign: "left", fontSize: "20px" }}
            >
              Prénom<small className="text-danger">*</small>
            </Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={lastName}
              onChange={formik.handleChange}
            />
            {formik.errors.lastName && (
              <span className="text-danger"> {formik.errors.lastName}</span>
            )}
          </Form.Group>
          <br />
          <Form.Group controlId="formBasicEmail">
            <Form.Label
              style={{ display: "block", textAlign: "left", fontSize: "20px" }}
            >
              Email<small className="text-danger">*</small>
            </Form.Label>
            <Form.Control
              type="email"
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
          <br />
          <Form.Group controlId="formBasicTelephone">
            <Form.Label
              style={{ display: "block", textAlign: "left", fontSize: "20px" }}
            >
              Téléphone<small className="text-danger">*</small>
            </Form.Label>
            <Form.Control
              type="tel"
              name="telephone"
              value={telephone}
              onChange={formik.handleChange}
            />
            {formik.errors.telephone && (
              <span className="text-danger"> {formik.errors.telephone}</span>
            )}
          </Form.Group>
          <br />
          <Form.Group controlId="formBasicVille">
            <Form.Label
              style={{ display: "block", textAlign: "left", fontSize: "20px" }}
            >
              Ville<small className="text-danger">*</small>
            </Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={city}
              onChange={formik.handleChange}
            />
            {formik.errors.city && (
              <span className="text-danger"> {formik.errors.city}</span>
            )}
          </Form.Group>
          <br />
          <Form.Group controlId="formBasicAdresse">
            <Form.Label
              style={{ display: "block", textAlign: "left", fontSize: "20px" }}
            >
              Adresse
            </Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={address}
              onChange={formik.handleChange}
            />
            {formik.errors.address && (
              <span className="text-danger"> {formik.errors.address}</span>
            )}
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Check
              type="checkbox"
              id="gcu"
              label="engagement, si vous voulez plus de détail  "
              checked={gcu}
              onChange={formik.handleChange}
              display-b
            />
            <a href="/">Consulter </a>ce fichier d'utilisation
          </Form.Group>

          <br></br>
          <Button
            style={{ display: "block", textAlign: "left" }}
            variant="info"
            type="submit"
            className="font-weight-bold w-70 h-25 fs-5"
          >
            Créer mon compte
          </Button>
        </Form>
      </div>
      <br></br>
      <br></br>
      <p>
        Vous avez déjà un compte avec nous? <a href="/login">se connecter</a>
      </p>
    </div>
  );
};

export default FormSignUp;
