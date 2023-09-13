import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ideaService from "service/ideaService";

function UpdateIdeaPublicBtn({ idea }) {
  const [isPublic, setIsPublic] = useState(idea.isPublic); // State to manage idea status
  const handleIsPublic = async (newStatus) => {
    await ideaService.updateIdea(idea._id, { isPublic: newStatus });
    setIsPublic(newStatus);
  };
  const handleIsPrivate = async (newStatus) => {
    await ideaService.updateIdea(idea._id, { isPublic: newStatus });
    setIsPublic(newStatus);
  };
  return (
    <Dropdown>
      <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic">
        {isPublic ? "Public" : "Private"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleIsPublic(true)}>
          Public
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleIsPrivate(false)}>
          Private
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UpdateIdeaPublicBtn;
