import React, { useEffect, useState } from "react";
import UpdateIdeaStatusBtn from "../components/Button/UpdateIdeaStatusBtn";

// react-bootstrap components
import { Card, Container, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import GetPublicIdeaBtn from "components/Button/GetPublicIdeaBtn";
import GetIdeaByStatusBtn from "components/Button/GetIdeaByStatusBtn";
import ideaService from "service/ideaService";
import formatDateTime from "utils/date_formatting";
import UpdateIdeaPublicBtn from "components/Button/UpdateIdeaPublicBtn";

function IdeasTable() {
  const [isPublic, setIsPublic] = useState("All");
  const [status, setStatus] = useState("All");
  const [ideas, setIdeas] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const handleisPublicFromChild = (isPublic) => {
    if (isPublic == "public") {
      setIsPublic(true);
    } else if (isPublic == "private") {
      setIsPublic(false);
    } else {
      setIsPublic("All");
    }
  };
  const handleStatusFromChild = (ideaStatus) => {
    setStatus(ideaStatus);
  };

  // useEffect(() => {
  //   (async () => {
  //     const res = await ideaService.getIdeaData();
  //     if (isPublic == "All" && status === "All") return setIdeas(res);
  //     if (isPublic !== "All" && status === "All")
  //       return setIdeas(res.filter((idea) => idea.isPublic === isPublic));
  //     if (isPublic === "All" && status !== "All")
  //       return setIdeas(res.filter((idea) => idea.status === status));
  //     setIdeas(
  //       res.filter(
  //         (idea) => idea.status === status && idea.isPublic === isPublic
  //       )
  //     );
  //   })();
  // }, [status, isPublic]);
  useEffect(() => {
    (async () => {
      const res = await ideaService.getIdeaData();
      let filteredIdeas = res;
      if (isPublic !== "All") {
        filteredIdeas = filteredIdeas.filter(
          (idea) => idea.isPublic === isPublic
        );
      }
      if (status !== "All") {
        filteredIdeas = filteredIdeas.filter((idea) => idea.status === status);
      }
      if (startDate && endDate) {
        filteredIdeas = filteredIdeas.filter(
          (idea) =>
            new Date(idea.datePublication) >= new Date(startDate) &&
            new Date(idea.datePublication) <= new Date(endDate)
        );
      }
      setIdeas(filteredIdeas);
    })();
  }, [status, isPublic, startDate, endDate]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="6">
            <Row className="d-flex align-items-center justify-content-center">
              <Col md="4">Start Date</Col>
              <Col md="8">
                <input
                  type="date"
                  className="form-control rounded"
                  placeholder="Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  aria-label="Start Date"
                  aria-describedby="start-date-addon"
                />
              </Col>
            </Row>
          </Col>
          <Col md="6">
            <Row className="d-flex align-items-center justify-content-center">
              <Col className="text-center" md="4">
                End Date
              </Col>
              <Col md="8">
                <input
                  type="date"
                  className="form-control rounded"
                  placeholder="End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  aria-label="End Date"
                  aria-describedby="end-date-addon"
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md="6">
            <GetPublicIdeaBtn
              onIsPublicFromChild={handleisPublicFromChild}
              isPublic={isPublic}
            />
          </Col>
          <Col md="6">
            <GetIdeaByStatusBtn
              onStatusFromChild={handleStatusFromChild}
              status={status}
            />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Toutes les Idées</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0 ">Author</th>
                      <th className="border-0 ">Designation</th>
                      <th className="border-0 ">Date Publication</th>
                      <th className="border-0 ">Ville</th>
                      <th className="border-0 ">etat</th>
                      <th className="border-0 ">Status</th>
                      <th className="border-0 ">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ideas.map((idea) => {
                      return (
                        <tr key={idea._id}>
                          <td>
                            <i className="nc-icon nc-single-02 mx-2"></i>
                            {idea.author &&
                              idea.author.firstName +
                                " " +
                                idea.author.lastName}
                          </td>
                          <td>{idea.designation}</td>
                          <td>{formatDateTime(idea.datePublication)}</td>
                          <td>{idea.city}</td>
                          <td>
                            {idea.isSend && <UpdateIdeaPublicBtn idea={idea} />}
                          </td>
                          <td>
                            {idea.isSend && <UpdateIdeaStatusBtn idea={idea} />}
                          </td>
                          <td>
                            <Link to={"Detail/" + idea._id}>detail</Link>
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

export default IdeasTable;
