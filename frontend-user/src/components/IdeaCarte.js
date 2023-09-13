import React from "react";
import { formatDate, truncateTitle } from "../utils/formate_text";
import { Link } from "react-router-dom";
import { BASE_URL_IMG } from "../Constants";
const IdeaCarte = ({ idea }) => {
  return (
    <article className="postcard light blue ">
      <Link
        to={"/detail/" + idea._id}
        className="postcard__img_link link__card"
      >
        <img
          className="postcard__img"
          src={BASE_URL_IMG + idea.ideaImage}
          alt="idea"
        />
      </Link>
      <div className="postcard__text t-dark ">
        <div className="blue" title={idea.designation}>
          {truncateTitle(idea.designation, 25)}
        </div>
        <div className="postcard__subtitle small  truncated-text">
          <time datetime={formatDate(idea.datePublication)}>
            <i className="fas fa-calendar-alt mx-2"></i>
            {formatDate(idea.datePublication)}
          </time>
        </div>
        <div className="postcard__bar"></div>
        <span className="postcard__preview-txt" title={idea.smallDescription}>
          {truncateTitle(idea.smallDescription, 23)}
        </span>
        <ul className="postcard__tagbox">
          <li className="tag__item play blue">
            <Link className="link__card" to={`/detail/${idea._id}`}>
              <i className="fas fa-info-circle me-2"></i>
              Detail
            </Link>
          </li>
        </ul>
      </div>
    </article>
  );
};

export default IdeaCarte;
