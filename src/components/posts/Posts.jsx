import Post from "../post/Post";
import { useSelector } from "react-redux";
import "./posts.css";

export default function Posts() {
  const { postReducer, topicReducer } = useSelector((state) => state);
  const postData = postReducer?.data;
  const topicData = topicReducer?.data;
  // console.log(postData);

  return (
    <div className="posts">
      {postData &&
        postData.map((p) => (
          <Post topicData={topicData} post={p} key={p.postId} />
        ))}
    </div>
  );
}
