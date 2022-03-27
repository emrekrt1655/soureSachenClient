import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post, topicData }) {


  return (
    <div className="post">
      {post.image && <img className="postImg" src={post.image} alt="post" />}
      <div className="postInfo">
      <p className="postDesc">{post?.text}</p>
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
    </div>
  );
}
