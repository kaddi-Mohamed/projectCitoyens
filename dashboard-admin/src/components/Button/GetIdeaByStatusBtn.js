import Dropdown from "react-bootstrap/Dropdown";

function GetIdeaByStatusBtn(props) {
  const handleStatusChange = (isPublic) => {
    props.onStatusFromChild(isPublic);
  };
  return (
    <Dropdown>
      <Dropdown.Toggle
        className="btn btn-primary btn-block mb-4"
        id="dropdown-basic"
      >
        {props.status}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => handleStatusChange("All")}
          href="#/action-1"
        >
          All
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => handleStatusChange("NEW")}
          href="#/action-1"
        >
          NEW
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => handleStatusChange("PENDING")}
          href="#/action-2"
        >
          PENDING
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleStatusChange("PROGRESS")}>
          PROGRESS
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleStatusChange("IN PROGRESS")}>
          IN PROGRESS
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default GetIdeaByStatusBtn;
