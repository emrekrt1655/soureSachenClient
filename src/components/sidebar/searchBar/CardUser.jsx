import React from "react";
import { Link } from "react-router-dom";
import "./cardUser.scss";

function CardUser({ user }) {
  return (
    <ul className="searchCard">
      <Link to={`/userProfile/${user?.userId}`}>
        {user?.userName?.length > 20 ? (
          <li>@{user?.userName?.slice(0, 20)}...</li>
        ) : (
          <li>@{user?.userName}</li>
        )}
      </Link>
    </ul>
  );
}

export default CardUser;
