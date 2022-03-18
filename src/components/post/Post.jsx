import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post, topicData }) {
  const topic = topicData?.filter((topic) => {
    return topic.topicId === post?.postTopicId;
  });

  const topicText = topic[0]?.text;

  return (
    <div className="post">
      {post.photo && <img className="postImg" src={post.photo} alt="" />}
      <div className="postInfo">
        {/* <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div> */}
        <Link to={`/post/${post?.postId}`} className="link">
          <span className="postTitle">{topicText}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post?.text}</p>
    </div>
  );
}
