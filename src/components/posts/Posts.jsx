import { FakeDoc } from "../post/FakeDoc";
import Post from "../post/Post";
import "./posts.scss";
export default function Posts({ topicData, postData, likeData }) {
  return (
    <div className="posts">
      {postData?.length > 0 ? (
        postData &&
        postData?.map((p) => (
          <Post
            topicData={topicData}
            post={p}
            key={p?.postId}
            likeData={likeData}
          />
        ))
      ) : (
        <FakeDoc />
      )}
    </div>
  );
}
