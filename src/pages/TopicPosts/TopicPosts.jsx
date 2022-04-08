import { useState } from "react";
import NewPostAdd from "../../components/newPostAdd/newPostAdd";
import TopicPost from "../../components/post/TopicPost";
import { useSelector } from "react-redux";
import "./topicPosts.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Sidebar from "../../components/sidebar/SideBar";
import { useParams } from "react-router-dom";
import LeftBarPostTopic from "../../components/leftBarPostTopic/LeftBarPostTopic";

export default function TopicPosts() {
  const { topicId } = useParams();
  const [open, setOpen] = useState(false);
  const { postReducer, topicReducer, likeReducer } = useSelector(
    (state) => state
  );
  const postData = postReducer?.data;
  const topicData = topicReducer?.data;
  const likeData = likeReducer?.data;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const posts = postData?.filter((post) => post.postTopicId === topicId);
  const currentTopic = topicData?.find((top) => top.topicId === topicId);

  return (
    <div style={{ display: "flex" }}>
      <LeftBarPostTopic handleOpen={handleOpen} />
      <NewPostAdd
        open={open}
        handleClose={handleClose}
        topicId={currentTopic?.topicId}
        posts={posts}
      />
      <div className="topicPost">
        <div className="topicPostContainer">
          <div className="topicHeader">
            <img src={currentTopic?.image} alt="topic"></img>
            <h1>{currentTopic?.text}</h1>
          </div>

          <div className="posts">
            {postData &&
              posts.map((p) => (
                <TopicPost
                  topicData={topicData}
                  likeData={likeData}
                  post={p}
                  key={p.postId}
                />
              ))}
          </div>
        </div>
        <Sidebar postData={posts} />
      </div>
    </div>
  );
}
