import React, { useEffect } from "react";
import "aos/dist/aos.css";
import { formatDate } from "../utils/formate_text";
import { functionAos, randomAosEffects } from "../utils/aos_effect";
import { BASE_URL_IMG } from "../Constants";
function SinglIdea({ idea }) {
  useEffect(() => {
    functionAos();
  }, []);
  return (
    <div className="single-post mt-3">
      <div className=" container post-meta">
        <div className="row gy-3">
          <div className="col-12">
            <strong className="d-flex justify-content-center">
              <u className="display-6">{idea.designation}</u>
            </strong>
          </div>
          <div className="col-12">
            <u>
              <span className="date mx-2">Publier le: </span>
              <time datetime={formatDate(idea.datePublication)}>
                <i className="fas fa-calendar-alt mx-3"></i>
                {formatDate(idea.datePublication)}
              </time>
              <strong className="mx-3">
                {idea.author &&
                  " par :  " +
                    idea.author.firstName +
                    " " +
                    idea.author.lastName}
              </strong>
            </u>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <figure className="mt-4">
              <img
                src={BASE_URL_IMG + idea.ideaImage}
                alt={idea.designation}
                className="img-fluid rounded"
                data-aos={randomAosEffects()}
              />
            </figure>
          </div>
        </div>
        <div className="row gy-3">
          <div className="col-md-12">
            <figcaption className="mt-3">{idea.smallDescription}</figcaption>
          </div>
          <div className="cil-md-12">
            <strong className="mt-3 ms-3">
              <u>plus d'info :</u>
            </strong>
            <p>{idea.longDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglIdea;
