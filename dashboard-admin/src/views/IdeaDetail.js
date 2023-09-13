import Hestory from "components/History";
import IdeaVideo from "components/IdeaVideo";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import ideaService from "service/ideaService";
import formatDateTime from "utils/date_formatting";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import * as yup from "yup";
import { BASE_URL_IMG } from "utils/const";
function IdeaDetail() {
  const [idea, setIdea] = useState({});
  const [isPublic, setIsPublic] = useState(false);
  const [urlDiscution, setUrlDiscution] = useState("");
  const [urlError, setUrlError] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [value, setValue] = useState(
    new DateObject().set({
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
      second: new Date().getSeconds(),
    })
  );
  const { id } = useParams();
  const handlePublicIdea = (id) => {
    ideaService
      .updateIdea(id, { isPublic: true })
      .then((res) => {
        console.log(res);
        setIsPublic(true);
        console.log("page refreshed");
        return setRefresh(!refresh);
      })
      .catch((error) => console.log(error));
  };
  const handlePrivateIdea = (id) => {
    ideaService
      .updateIdea(id, { isPublic: false })
      .then((res) => {
        console.log(res);
        setIsPublic(false);
        return setRefresh(!refresh);
      })
      .catch((error) => console.log(error));
  };

  const handleAdd = (id) => {
    if (!urlError)
      ideaService
        .addUrlDiscutionToIdea(
          id,
          urlDiscution,
          value.format("MM/DD/YYYY HH:mm:ss")
        )
        .then((res) => {
          console.log(res);
          setValue("");
          setUrlDiscution("");
          setRefresh(!refresh);
        })
        .catch((err) => console.log(err));
  };
  const urlSchema = yup.string().url("Veuillez entrer une URL valide");
  const validateUrl = (url) => {
    try {
      urlSchema.validateSync(url);
      setUrlError("");
    } catch (error) {
      setUrlError(error.message);
    }
  };
  const handleUrlChange = (e) => {
    const { value } = e.target;
    setUrlDiscution(value);
    validateUrl(value);
  };
  useEffect(() => {
    const fetchIdea = async (id) => {
      const res = await ideaService.getIdeaById(id);
      setIdea(res[0]);
      setIsPublic(res[0].isPublic);
    };
    fetchIdea(id);
  }, [id, refresh, isPublic]);
  return (
    <>
      <main>
        <div className="container px-4">
          <div className="row">
            <div className="col-md-8 mb-4">
              <section className="border-bottom mb-4">
                <img
                  src={BASE_URL_IMG + idea.ideaImage}
                  className="img-fluid shadow-2-strong rounded-5 mb-4"
                  alt={idea.designation}
                />
                <div className="row align-items-center mb-4">
                  <div className="col-lg-6 text-center text-lg-start mb-3 m-lg-0">
                    <span>
                      <i className="nc-icon nc-settings-90 mx-3"></i>
                      Créez-le
                      <u className="mx-3">
                        {formatDateTime(idea.datePublication)}
                      </u>
                    </span>
                  </div>
                </div>
              </section>
              <section>
                <u>
                  <p className="d-flex justify-content-center">
                    <strong>{idea.designation}</strong>
                  </p>
                </u>
                <p>
                  <u>
                    <strong>Résumé : </strong>
                  </u>
                </p>
                <p className="note note-light">
                  <strong>Description:</strong> {idea.smallDescription}
                </p>
                <p>
                  <strong>Plus :</strong>
                </p>
                <p className="note note-light">{idea.longDescription}</p>
              </section>
              <ul className="bordered rounded">
                {idea.urlVideo && (
                  <li className="list-group-item">
                    <IdeaVideo urlVideo={idea.urlVideo} />
                  </li>
                )}
                <li className="list-group-item">
                  Secteur : {idea.activitySector}
                </li>
                <li className="list-group-item">Ville : {idea.city}</li>
                <li className="list-group-item">
                  Quartier : {idea.neighborhood}
                </li>
                <li className="list-group-item">
                  Statut : {isPublic ? "Public" : "Private"}
                </li>
                <li className="list-group-item">
                  Statut :{" "}
                  <i
                    className={`fas fa-circle ${
                      idea.status === "NEW" && "text-danger"
                    }`}
                  ></i>
                  New{" "}
                  <i
                    className={`fas fa-circle ${
                      idea.status === "PENDING" && "text-danger"
                    }`}
                  ></i>
                  Pending{" "}
                  <i
                    className={`fas fa-circle ${
                      idea.status === "IN PROGRESS" && "text-danger"
                    }`}
                  ></i>
                  In Progress
                  <i
                    className={`fas fa-circle ${
                      idea.status === "REALIZED" && "text-danger"
                    }`}
                  ></i>
                  Realized
                </li>
                <li className="list-group-item">
                  urlDiscution : {idea.urlDiscution}
                </li>
                {idea.isSend && (
                  <li className="list-group-item">
                    <form class="px-md-2">
                      <div className="row">
                        <div class="col-md-4">
                          <label
                            className="form-label py-2"
                            for="form3Example1q"
                          >
                            Discussion Forum :
                          </label>
                        </div>
                        <div className="col-md-8">
                          <input
                            value={urlDiscution}
                            type="text"
                            id="form3Example1q"
                            className="form-control"
                            onChange={handleUrlChange}
                          />
                          {urlError && (
                            <div className="text-danger mt-1">{urlError}</div>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div class="col-md-4">
                          <label
                            className="form-label py-2"
                            for="form3Example1q"
                          >
                            date de Discution :
                          </label>
                        </div>
                        <div className="col-lg-4">
                          <DatePicker
                            value={value}
                            onChange={setValue}
                            format="MM/DD/YYYY HH:mm:ss"
                            plugins={[
                              <TimePicker position="bottom" />,
                              <DatePanel markFocused />,
                            ]}
                          />
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-12">
                          <Button
                            className="btn btn-success btn-sm w-100 mb-1"
                            onClick={() => handleAdd(idea._id)}
                          >
                            Ajouter
                          </Button>
                        </div>
                      </div>
                    </form>
                  </li>
                )}
                {idea.isSend && (
                  <li className="list-group-item">
                    <div className="row">
                      {!idea.isPublic && (
                        <div className="col-md-12">
                          <button
                            onClick={() => handlePublicIdea(id)}
                            className="btn btn-primary btn-sm w-100"
                          >
                            Public
                          </button>
                        </div>
                      )}
                      {idea.isPublic && (
                        <div className="col-md-12">
                          <button
                            onClick={() => handlePrivateIdea(id)}
                            className="btn btn-primary btn-sm w-100 "
                          >
                            Private
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                )}
              </ul>
            </div>
            <div className="col-md-4">
              {idea._id && <Hestory frefresh={refresh} ideaId={idea._id} />}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default IdeaDetail;
