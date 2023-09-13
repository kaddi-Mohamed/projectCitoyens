import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Le mot de passe est requis"),
  confirmPassword: Yup.string()
    .required("La confirmation du mot de passe est requise")
    .oneOf([Yup.ref('password'), null], "Les mots de passe ne correspondent pas")
});

export default validationSchema;
