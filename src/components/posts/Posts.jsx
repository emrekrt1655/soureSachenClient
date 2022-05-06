import Post from "../post/Post";
import "./posts.css";
export default function Posts({ topicData, postData, likeData }) {
  return (
    <div className="posts">
      {postData &&
        postData?.map((p, index) => (
          <Post
            topicData={topicData}
            post={p}
            key={index}
            likeData={likeData}
          />
        ))}
    </div>
  );
}
