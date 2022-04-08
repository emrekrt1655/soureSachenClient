import Post from "../post/Post";
import "./posts.css";
export default function Posts({ topicData, postData, likeData }) {
  return (
    <div className="posts">
      {postData &&
        postData?.map((p) => (
          <Post
            topicData={topicData}
            post={p}
            key={p.postId}
            likeData={likeData}
          />
        ))}
    </div>
  );
}
