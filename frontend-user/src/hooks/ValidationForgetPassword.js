import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  email: Yup.string().required("l'email est requis"),
});

export default validationSchema;
