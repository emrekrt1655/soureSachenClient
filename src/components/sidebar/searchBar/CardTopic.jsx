import React from "react";
import { Link } from "react-router-dom";

function CardTopic({ topic }) {
  return (
    <ul className="searchCard">
      <Link to={`/${topic?.topicId}`}>
        {topic?.text?.length > 20 ? (
          <li>{topic?.text?.slice(0, 20)}...</li>
        ) : (
          <li>{topic?.text}</li>
        )}
      </Link>
    </ul>
  );
}

export default CardTopic;
