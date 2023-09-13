import React, { useEffect } from "react";
import { Form, Button,Container } from 'react-bootstrap';
import { useFormik } from "formik";
import * as yup from "yup";
import validationSchema from "../hooks/ValidationUpdateUser";
import axios from "axios";
import PREFIX from "../Constants";
import {MdAccountCircle} from 'react-icons/md';



function UpdateUser2() {
    const initialValues ={
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        telephone: "",
        city: "",
        address: "", 
        roles:"",
        gcu:false
      }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        let result = await fetch(
          "https://run.mocky.io/v3/5be581aa-89d3-43e3-8478-7186633f8d16",
          {
            method: "post",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `${values.offerType}&${values.NegotiationTitle}&${values.email}&${values.password}`
          }
        );
        console.log("Submited: " + result);
      } catch (e) {
        console.log(e);
      }
    }
  });

  useEffect(() => {
    (async () => {
        try {
          const res = await axios.get(`${PREFIX}user/me`, {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": `${localStorage.getItem("token")}`,
            },
          });
           
          //setData()
          formik.setValues(res);

          
        } catch (error) {
          // Gérez l'erreur ici, par exemple en affichant un message d'erreur ou en effectuant une action spécifique
          console.error("Erreur lors de la récupération de l'utilisateur :", error);
        }
      })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        fullWidth
        id="firstName"
        name="firstName"
        label="firstName"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        error={formik.touched.offerType && Boolean(formik.errors.offerType)}
        helperText={formik.touched.offerType && formik.errors.offerType}
      />

      <input
        fullWidth
        id="lastName"
        name="lastName"
        label="lastName"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.touched.Title && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
      />
       <input
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <input
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.address}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </form>
  );
}
export default UpdateUser2;

