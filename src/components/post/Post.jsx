import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post, topicData }) {
  const topic = topicData?.filter((topic) => {
    return topic?.topicId === post?.postTopicId;
  });

  const topicText = topic?.map(({ text }) => text);
  const topicId = topic?.map(({ topicId }) => topicId);

  return (
    <div className="post">
      {post.photo && <img className="postImg" src={post.photo} alt="post" />}
      <div className="postInfo">
        <Link to={`topic/${topicId}`}>
        
        <p className="postTitle">{topicText}</p>
        </Link>
      <p className="postDesc">{post?.text}</p>
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
    </div>
  );
}
