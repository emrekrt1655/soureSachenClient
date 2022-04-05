import NewPostAdd from "../../components/newPostAdd/newPostAdd";
import TopicPost from "../../components/post/TopicPost";
import { useSelector } from "react-redux";
import "./topicPosts.css";

import { useParams } from "react-router-dom";

export default function TopicPosts() {
  const { topicId } = useParams();
  const { postReducer, topicReducer } = useSelector((state) => state);
  const postData = postReducer?.data;
  const topicData = topicReducer?.data;

  const posts = postData?.filter((post) => post.postTopicId === topicId);
  const currentTopic = topicData?.filter((top) => top.topicId === topicId);
  const topicText = currentTopic?.map(({ text }) => text);
  const topicImage = currentTopic?.map(({ image }) => image);

  return (
    <div className="topicPostContainer">
      <div className="topicHeader">
        <img src={topicImage} alt="topicImage"></img>
        <h1> {topicText}</h1>
      </div>

      <div className="posts">
        {postData &&
          posts.map((p) => (
            <TopicPost topicData={topicData} post={p} key={p.postId} />
          ))}
      </div>
      <div className="newPostAddSection">
        <NewPostAdd />
      </div>
    </div>
  );
}
