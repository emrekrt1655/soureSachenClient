import { useState, useEffect } from "react";
import SinglePost from "../../components/singlePost/SinglePost";
import LeftBarPostTopic from "../../components/leftBarPostTopic/LeftBarPostTopic";
import NewPostAdd from "../../components/newPostAdd/newPostAdd";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../components/sidebar/SideBar";
import { getComments } from "../../redux/actions/commentAction";
// import "./single.css";

import { typeText } from "../../redux/actions/alertAction";
import "./single.scss";

export default function Single({
  likeData,
  user,
  postData,
  topicData,
  users,
  access_token,
}) {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const [open, setOpen] = useState(false);
  const { commentReducer } = useSelector((state) => state);

  const handleOpen = () => {
    user?.userId
      ? setOpen(true)
      : dispatch(typeText("Please Login now to share your Opinion!"));
  };
  const handleClose = () => setOpen(false);

  const post = postData?.find((post) => post?.postId === postId);
  const currentTopic = topicData?.find(
    (top) => top?.topicId === post?.postTopicId
  );

  const userOfPost = users?.find((user) => user?.userId === post?.postUserId);

  useEffect(() => {
    post?._count?.comments > 0 && dispatch(getComments(postId));
  }, [post?._count?.comments, postId, dispatch]);

  const commentData = commentReducer.data;

  return (
    <>
      <NewPostAdd
        open={open}
        handleClose={handleClose}
        topicId={currentTopic?.topicId}
        posts={postData}
        user={user}
        topics={topicData}
        access_token={access_token}
      />
      <div className="single">
        <LeftBarPostTopic handleOpen={handleOpen} post={post} />
        <SinglePost
          post={post}
          topicTitle={currentTopic}
          userOfPost={userOfPost}
          commentData={commentData}
          likeData={likeData}
          authUser={user}
          access_token={access_token}
          users={users}
        />
        <Sidebar
          user={user}
          access_token={access_token}
          postData={postData}
          topicData={topicData}
          likeData={likeData}
        />
      </div>
    </>
  );
}
