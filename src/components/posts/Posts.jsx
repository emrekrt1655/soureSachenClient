import NewPostAdd from "../newPostAdd/newPostAdd";
import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      <NewPostAdd />
      {posts?.map((p) => (
        <Post post={p} />
      ))}
    </div>
  );
}
