import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Le nom est requis"),
  lastName: Yup.string().required("Le prénom est requis"),
  email: Yup.string()
    .email("L'email n'est pas valide")
    .required("L'email est requis"),
  //username: Yup.string().required("le username est obligatoir")

  telephone: Yup.string()
    .typeError("Le numéro de téléphone est requis")
    .required("le telephone est important"),
  city: Yup.string().required("La ville est requise"),
  address: Yup.string(),
});

export default validationSchema;
