import { useState } from "react";
import SinglePost from "../../components/singlePost/SinglePost";
import LeftBarPostTopic from "../../components/leftBarPostTopic/LeftBarPostTopic";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../../components/sidebar/SideBar";
import "./single.css";

export default function Single() {
  const { postId } = useParams();
  const [open, setOpen] = useState(false);
  const { postReducer, topicReducer, userReducer } = useSelector(
    (state) => state
  );
  const postData = postReducer?.data;
  const topicData = topicReducer?.data;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const post = postData?.find((post) => post?.postId === postId);
  console.log(post);
  const currentTopic = topicData?.find(
    (top) => top.topicId === post?.postTopicId
  );

  const users = userReducer?.data;
  const userOfPost = users?.find((user) => user?.userId === post?.postUserId);
  return (
    <div className="single">
      <LeftBarPostTopic handleOpen={handleOpen} />
      <SinglePost
        post={post}
        topicTitle={currentTopic}
        userOfPost={userOfPost}
      />
      <Sidebar />
    </div>
  );
}
