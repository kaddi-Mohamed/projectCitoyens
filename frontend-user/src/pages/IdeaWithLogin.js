import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import IdeaCarte from "../components/IdeaCarte";
import { Container } from "react-bootstrap";
import "aos/dist/aos.css";
import "./Ideas.css";
import { functionAos, randomAosEffects } from "../utils/aos_effect";
import { getPublicIdeas } from "../service/ideaService";
import NotIdeaFound from "./NotIdeaFound";
const IdeaWithLogin = () => {
  const [ideas, setIdeas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredIdeas = ideas.filter(
    (idea) =>
      idea.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.smallDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    functionAos();
    const fetchPublicIdeas = async () => {
      const data = await getPublicIdeas();
      if (data) {
        setIdeas(data);
        console.log(data);
      }
    };
    fetchPublicIdeas();
  }, []);
  return (
    <>
      {ideas.length === 0 ? (
        <NotIdeaFound message="Sorry, no idea has been posted yet" />
      ) : (
        <div className="mt-3">
          <Container>
            <Row>
              <Col md={12}>
                <div class="input-group rounded">
                  <input
                    type="search"
                    class="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <span
                    class="input-group-text text-success rounded-4 mx-2 border-0"
                    id="search-addon"
                  >
                    <i class="fas fa-search"></i>
                  </span>
                </div>
              </Col>
            </Row>
            <Row className="mt-4">
              {filteredIdeas.map((idea) => (
                <div
                  key={idea._id}
                  data-aos={randomAosEffects()}
                  className="col-md-6 col-lg-6 d-block text-start"
                >
                  <IdeaCarte
                    key={idea._id}
                    idea={idea}
                    className="custom-card"
                  />
                </div>
              ))}
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default IdeaWithLogin;
