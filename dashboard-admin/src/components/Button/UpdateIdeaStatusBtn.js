import axios from "axios";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ideaService from "service/ideaService";

function UpdateIdeaStatusBtn({ idea }) {
  const [status, setStatus] = useState(idea.status); // State to manage idea status

  const handleStatusChange = (newStatus) => {
    if (status !== newStatus) {
      setStatus(newStatus);
      ideaService.updateIdea(idea._id, { status: newStatus });
    }
  };
  return (
    <Dropdown>
      <Dropdown.Toggle size="sm" variant="success" id="dropdown-basic">
        {status}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleStatusChange("NEW")}>
          NEW
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleStatusChange("PENDING")}>
          PENDING
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleStatusChange("IN PROGRESS")}>
          IN PROGRESS
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleStatusChange("REALIZED")}>
          REALIZED
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UpdateIdeaStatusBtn;
