import { Link } from "react-router-dom";
import "./likedposts.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import { getLikes, like, unlike } from "../../../redux/actions/likeAction";
import { typeText } from "../../../redux/actions/alertAction";
import CreateNewComment from "../../newCommentAdd/CreateComment";

export default function Post({
  postData,
  topicData,
  likeData,
  user,
  access_token,
}) {
  const dispatch = useDispatch();
  const posts = postData;
  const topics = topicData;
  const authUserId = user?.userId;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    authUserId
      ? setOpen(true)
      : dispatch(typeText("Please Login now to comment!"));
  };
  const handleClose = () => setOpen(false);

  let newList = [];

  posts?.map((post) => {
    return newList.push({
      postId: post.postId,
      count: post._count.comments + post._count.likes,
    });
  });

  newList?.sort(function (a, b) {
    return b.count - a.count;
  });

  const likedPost = posts?.find((post) => post.postId === newList[0]?.postId);
  const topic = topics?.find((t) => {
    return t.topicId === likedPost?.postTopicId;
  });

  const topicId = topic?.topicId;

  const likes = likeData?.filter(
    (like) => like?.likePostId === likedPost?.postId
  );
  const likeCounts =
    `${likes?.length}}` <= 1
      ? `${likes?.length} Like`
      : `${likes?.length} Likes`;
  const likeState = {
    likePostId: likedPost?.postId,
    likeUserId: authUserId,
  };

  const id = likes
    ?.filter((l) => l.likeUserId === authUserId)
    ?.map(({ likeId }) => likeId);

  const onLike = () =>
    authUserId
      ? dispatch(like(likeState, access_token)).then(() => dispatch(getLikes()))
      : dispatch(typeText("Please Login now to like!"));
  const onUnlike = () =>
    authUserId &&
    dispatch(unlike(id, access_token)).then(() => dispatch(getLikes()));

  return (
    <>
      <CreateNewComment
        post={likedPost}
        open={open}
        handleClose={handleClose}
      />
      <div className="postlked">
        {likedPost?.image && (
          <Link to={`/post/${likedPost?.postId}`} className="postlkedLink">
            <img
              className="postImgliked"
              src={likedPost?.image}
              alt="mostLikedpost"
            ></img>
          </Link>
        )}
        <div className="posttextinfo">
          <div className="postInfo">
            <span className="likedPostTitle">
              <Link to={`/${topicId}`} className="link">
                {topic?.text}
              </Link>
            </span>
            <hr />
          </div>
          <Link to={`/post/${likedPost?.postId}`} className="postlkedLink">
            <p className="likedPostDesc">{likedPost?.text}</p>
          </Link>
          <div className="extrainfo">
            <span className="postDate">
              {new Date(likedPost?.createdAt).toDateString()}
            </span>
          </div>
          <div className="extrainfo">
            <span onClick={id?.length === 0 ? onLike : onUnlike}>
              <Tooltip title={likeCounts}>
                {id?.length === 0 ? (
                  <RecommendRoundedIcon />
                ) : (
                  <RecommendOutlinedIcon />
                )}
              </Tooltip>
            </span>
            <Tooltip
              onClick={handleOpen}
              title={
                `${likedPost?._count?.comments}` <= 1
                  ? `${likedPost?._count?.comments} Comment`
                  : `${likedPost?._count?.comments} Comments`
              }
            >
              <MarkChatUnreadIcon style={{ margin: "0 2% " }} />
            </Tooltip>
            <Tooltip title="Share">
              <ShareRoundedIcon style={{ margin: "0 2% " }} />
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}
