import Dropdown from "react-bootstrap/Dropdown";

function GetPublicIdeaBtn(props) {
  const handleStatusChange = (isPublic) => {
    props.onIsPublicFromChild(isPublic);
  };
  return (
    <Dropdown>
      <Dropdown.Toggle
        className="btn btn-success btn-block mb-4"
        id="dropdown-basic"
      >
        {props.isPublic === "All"
          ? "All"
          : props.isPublic
          ? "Public"
          : "Private"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleStatusChange("All")}>
          All
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleStatusChange("public")}>
          Public
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleStatusChange("private")}>
          Private
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default GetPublicIdeaBtn;
