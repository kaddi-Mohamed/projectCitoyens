import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    designation: Yup.string().required("La designation est requis"),
    smallDescription: Yup.string().required("ce champ est obligatoire"),
    longDescription: Yup.string().required("ce champ est obligatoire"),
    image: Yup.string(),
    urlVideo: Yup.string().required("ce champ est requis"),
    activitySector: Yup.string().required("ce champ est important"),
    city: Yup.string().required("La ville est requise"),
    neighborhood: Yup.string("ce champ est obligatoire"),
  });

  export default validationSchema;