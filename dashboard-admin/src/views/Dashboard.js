import React from "react";
import ChartistGraph from "react-chartist";
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
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useEffect } from "react";
import userService from "service/userService";
import { useState } from "react";
import ideaService from "service/ideaService";
import { truncateTitle } from "utils/text-formatting";
import { Link } from "react-router-dom";
import commentService from "service/commentService";

function Dashboard() {
  const [userNbr, setUserNbr] = useState(0);
  const [sendIdeaNbr, setSendIdeaNbr] = useState(0);
  const [mostLikedIdea, setMostLikedIdea] = useState("");
  const [newIdeaNbr, setNewIdeaNbr] = useState(0);
  const [pendingIdeaNbr, setPendingIdeaNbr] = useState(0);
  const [realizedIdeaNbr, setRealizedIdeaNbr] = useState(0);
  const [inProgressIdeaNbr, setInProgressIdeaNbr] = useState(0);
  const [verifiedUserNbr, setVerifiedUserNbr] = useState(0);
  const [nonverifiedUserNbr, setNonVerifiedUserNbr] = useState(0);
  const [commentNbr, setCommentNbr] = useState(0);

  useEffect(() => {
    const fetchMostIdeaLiked = async () => {
      const res = await userService.getMostLikedIdea();
      setMostLikedIdea(res);
      console.log("the most idea liked" + mostLikedIdea);
    };
    fetchMostIdeaLiked();
    const fetchUserNbr = async () => {
      const res = await userService.getUserCount();
      setUserNbr(res);
    };
    fetchUserNbr();

    // comment nbr
    const fetchCommentNbr = async () => {
      const res = await commentService.getCommentCount();
      setCommentNbr(res);
    };
    fetchCommentNbr();
    //non virefied users
    const fetchNonVerifiedUserNbr = async () => {
      const res = await userService.getUserCountByEmailVerified(false);
      setNonVerifiedUserNbr(res);
    };
    fetchNonVerifiedUserNbr();
    //veridied User nbr
    const fetchVerifiedUserNbr = async () => {
      const res = await userService.getUserCountByEmailVerified(true);
      setVerifiedUserNbr(res);
    };
    fetchVerifiedUserNbr();
    //all idea
    const fetchIdeaNbr = async () => {
      const res = await ideaService.getIdeaCount();
      setSendIdeaNbr(res);
    };
    fetchIdeaNbr();

    //new
    const fetchNewIdeaNbr = async () => {
      const res = await ideaService.getIdeaCountByStatus("NEW");
      setNewIdeaNbr(res);
    };
    fetchNewIdeaNbr();

    //pending
    const fetchPendingIdeaNbr = async () => {
      const res = await ideaService.getIdeaCountByStatus("PENDING");
      setPendingIdeaNbr(res);
    };
    fetchPendingIdeaNbr();

    //progress
    const fetchRealizedIdeaNbr = async () => {
      const res = await ideaService.getIdeaCountByStatus("REALIZED");
      setRealizedIdeaNbr(res);
    };
    fetchRealizedIdeaNbr();
    //inprogress
    const fetchInProgressIdeaNbr = async () => {
      const res = await ideaService.getIdeaCountByStatus("IN PROGRESS");
      setInProgressIdeaNbr(res);
    };
    fetchInProgressIdeaNbr();
  }, []);
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-badge text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">USERS</p>
                      <Card.Title as="h4">{userNbr}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-bulb-63 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">IDEES</p>
                      <Card.Title as="h4">{sendIdeaNbr}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last day
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-info">
                      <i className="nc-icon nc-chat-round  text-info"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Commentaires</p>
                      <Card.Title as="h4">{commentNbr}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats"></div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">IDEE TREND</p>
                      <Card.Title as="h4">{mostLikedIdea.like}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <Link to={"Detail/" + mostLikedIdea._id}>
                    {mostLikedIdea.designation
                      ? truncateTitle(mostLikedIdea.designation, 20)
                      : "idee plus like detail"}
                    <i className="nc-icon nc-stre-right text-info"></i>
                  </Link>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">
                  {" "}
                  <i className="nc-icon nc-chart-pie-35 mr-1 text-warning"></i>
                  Statistiques d'utilisateur
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: [
                        `${((verifiedUserNbr / userNbr) * 100).toFixed(2)}%`,
                        `${((nonverifiedUserNbr / userNbr) * 100).toFixed(2)}%`,
                      ],
                      series: [
                        `${(verifiedUserNbr / userNbr) * 100}`,
                        `${(nonverifiedUserNbr / userNbr) * 100}`,
                      ],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  virefied
                  <i className="fas fa-circle text-danger"></i>
                  non verified
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">
                  <i className="nc-icon nc-chart-pie-36 text-info mr-1"></i>
                  Idées de statistiques
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: [
                        `${((newIdeaNbr / sendIdeaNbr) * 100).toFixed(2)}%`,
                        `${((pendingIdeaNbr / sendIdeaNbr) * 100).toFixed(2)}%`,
                        `${((realizedIdeaNbr / sendIdeaNbr) * 100).toFixed(
                          2
                        )}%`,
                        `${((inProgressIdeaNbr / sendIdeaNbr) * 100).toFixed(
                          2
                        )}% `,
                      ],
                      series: [
                        `${(newIdeaNbr / sendIdeaNbr) * 100}`,
                        `${(pendingIdeaNbr / sendIdeaNbr) * 100}`,
                        `${(realizedIdeaNbr / sendIdeaNbr) * 100}`,
                        `${(inProgressIdeaNbr / sendIdeaNbr) * 100}`,
                      ],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  New
                  <i className="fas fa-circle text-danger"></i>
                  Pending
                  <i className="fas fa-circle text-primary"></i>
                  In Progress
                  <i className="fas fa-circle text-warning"></i>
                  Realized
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
