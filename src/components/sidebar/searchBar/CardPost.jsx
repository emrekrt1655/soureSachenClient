import React from "react";
import { Link } from "react-router-dom";

function CardPost({ post }) {
  return (
    <ul className="searchCard">
      <Link to={`/post/${post?.postId}`}>
        {post?.text?.length > 20 ? (
          <li>{post?.text?.slice(0, 20)}...</li>
        ) : (
          <li>{post?.text}</li>
        )}
      </Link>
    </ul>
  );
}

export default CardPost;
