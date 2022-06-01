import { useState } from "react";
import NewPostAdd from "../../components/newPostAdd/newPostAdd";
import TopicPost from "../../components/post/TopicPost";
import { useSelector, useDispatch } from "react-redux";
import "./topicPosts.scss";
import Sidebar from "../../components/sidebar/SideBar";
import { useParams } from "react-router-dom";
import LeftBarPostTopic from "../../components/leftBarPostTopic/LeftBarPostTopic";
import { typeText } from "../../redux/actions/alertAction";

export default function TopicPosts() {
  const dispatch = useDispatch();
  const { topicId } = useParams();
  const [open, setOpen] = useState(false);
  const { authReducer, postReducer, topicReducer, likeReducer } = useSelector(
    (state) => state
  );
  const postData = postReducer?.data;
  const topicData = topicReducer?.data;
  const likeData = likeReducer?.data;
  const user = authReducer?.user;
  const access_token = authReducer?.access_token;
  const handleOpen = () => {
    user?.userId
      ? setOpen(true)
      : dispatch(typeText("Please Login now to share your Opinion!"));
  };
  const handleClose = () => setOpen(false);
  const posts = postData?.filter((post) => post.postTopicId === topicId);
  const currentTopic = topicData?.find((top) => top.topicId === topicId);

  return (
    <div className="topicDevContainer">
      <LeftBarPostTopic handleOpen={handleOpen} />
      <NewPostAdd
        open={open}
        handleClose={handleClose}
        topicId={currentTopic?.topicId}
        posts={posts}
      />
      <div className="topicPost">
        <div className="topicPost__topicPostContainer">
          <div className="topicPost__topicPostContainer--topicHeader">
            <img src={currentTopic?.image} alt="topic"></img>
            <h1>{currentTopic?.text}</h1>
          </div>
          {posts?.length > 0 ? (
            <div className="posts">
              {posts &&
                posts.map((p, index) => (
                  <TopicPost
                    topicData={topicData}
                    likeData={likeData}
                    post={p}
                    key={index}
                  />
                ))}
            </div>
          ) : (
            <h2> There is no any Opinions about this topic. </h2>
          )}
        </div>
        <Sidebar
          user={user}
          access_token={access_token}
          postData={posts}
          topicData={topicData}
          likeData={likeData}
        />
      </div>
    </div>
  );
}
