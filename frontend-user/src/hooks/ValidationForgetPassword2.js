import * as Yup from "yup";



const validationSchema = Yup.object().shape({
   
    password: Yup.string().required("l'email est requis"),
    token: Yup.string()
  
    
  });

  export default validationSchema;