import { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import PREFIX from "../Constants";
import { useParams } from "react-router-dom";
import { IditeImage } from "../service/ideaService";

const UpdateImageForm = () => {
  const [IdeaImage, setIdeaImage] = useState("");
  const { id } = useParams();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(IdeaImage);
    IditeImage(id, IdeaImage);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicGalerieImage">
        <Form.Label
          style={{
            display: "block",
            textAlign: "left",
            fontSize: "20px",
          }}
        >
          Image<small>*</small>
        </Form.Label>
        <Form.Control
          type="file"
          name="IdeaImage"
          onChange={(event) => setIdeaImage(event.target.files[0])}
        />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default UpdateImageForm;
