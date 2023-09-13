import * as Yup from "yup";



const validationSchema = Yup.object().shape({
   
    email: Yup.string().required("l'email est requis"),
    password: Yup.string().required("Le mot de passe est obligatoire")
      
      
    
  });

  export default validationSchema;