import "./post.css";

export default function Post({ post }) {
  return (
    <div className="post">
      {post?.image && <img className="postImg" src={post.image} alt="post" />}
      <div className="postInfo">
        <p className="postDesc">{post?.text}</p>
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
    </div>
  );
}
