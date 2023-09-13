import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import userService from "service/userService";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Voulez-vous enregistrer les modifications ?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Confirmer",
      denyButtonText: `Don't save`,
    });
    if (result.isConfirmed) {
      userService.deleteUserById(id).then((res) => console.log(res));
      setRefresh(true);
      Swal.fire("User supprimer!", "", "success");
    }
  };
  const handleDelete = (id) => {
    deleteUser(id);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await userService.getAllUsers();
      setUsers(res);
    };
    fetchUsers();
  }, [refresh]);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">User Table</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">nom</th>
                      <th className="border-0">prenom</th>
                      <th className="border-0">email</th>
                      <th className="border-0">tel</th>
                      <th className="border-0">Ville</th>
                      <th className="border-0">Quartier</th>
                      <th className="border-0">Role</th>
                      <th className="border-0">Vérifié</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => {
                      return (
                        <tr>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.email}</td>
                          <td>{user.telephone}</td>
                          <td>{user.city}</td>
                          <td>{user.address}</td>
                          <td>{user.roles}</td>
                          <td>{user.verified ? "OUI" : "NO"}</td>
                          <td>
                            <Button
                              onClick={() => handleDelete(user._id)}
                              variant="danger"
                              size="sm"
                            >
                              Supprimer
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UsersTable;
