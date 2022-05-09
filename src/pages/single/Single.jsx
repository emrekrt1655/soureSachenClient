import { useState, useEffect } from "react";
import SinglePost from "../../components/singlePost/SinglePost";
import LeftBarPostTopic from "../../components/leftBarPostTopic/LeftBarPostTopic";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../components/sidebar/SideBar";
import { getComments } from "../../redux/actions/commentAction";

import "./single.css";

export default function Single() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const [open, setOpen] = useState(false);
  const { authReducer, likeReducer, postReducer, topicReducer, userReducer, commentReducer } =
    useSelector((state) => state);
  const postData = postReducer?.data;
  const topicData = topicReducer?.data;
  const likeData = likeReducer?.data;


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = authReducer?.user
  const access_token = authReducer?.access_token;
  const post = postData?.find((post) => post?.postId === postId);
  const currentTopic = topicData?.find(
    (top) => top?.topicId === post?.postTopicId
  );

  const users = userReducer?.data;
  const userOfPost = users?.find((user) => user?.userId === post?.postUserId);

  useEffect(() => {
    postId && dispatch(getComments(postId));
  }, [postId, dispatch]);

  const comments = commentReducer.data;
  const userOfCommnets = users?.find(
    (user) => user?.userId === comments?.commentUserId
  );

  return (
    <div className="single">
      <LeftBarPostTopic handleOpen={handleOpen} />
      <SinglePost
        post={post}
        topicTitle={currentTopic}
        userOfPost={userOfPost}
        comments={comments}
        userOfCommnets={userOfCommnets}
      />
      <Sidebar user={user} access_token={access_token}  postData={postData} topicData={topicData} likeData={likeData} />
    </div>
  );
}
