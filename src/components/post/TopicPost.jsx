import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import CreateNewComment from "../newCommentAdd/CreateComment";
import "./topicPost.css";
import { getLikes, like, unlike } from "../../redux/actions/likeAction";

export default function TopicPost({ post, likeData }) {
  const dispatch = useDispatch();
  const { authReducer, userReducer } = useSelector((state) => state);
  const authUser = authReducer?.user;
  const authUserId = authReducer?.user?.userId;
  const access_token = authReducer?.access_token;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const users = userReducer?.data;
  const userOfPost = users?.find((user) => user?.userId === post?.postUserId);
  const likes = likeData?.filter((like) => like?.likePostId === post?.postId);

  const likeCounts =
    `${likes?.length}}` <= 1
      ? `${likes?.length} Like`
      : `${likes?.length} Likes`;

  const likeState = {
    likePostId: post?.postId,
    likeUserId: authUserId,
  };


  const id = likes
    ?.filter((l) => l.likeUserId === authUserId)
    ?.map(({ likeId }) => likeId);

  const onLike = () =>
    dispatch(like(likeState, access_token)).then(() => dispatch(getLikes()));
  const onUnlike = () =>
    dispatch(unlike(id, access_token)).then(() => dispatch(getLikes()));

  return (
    <>
      <CreateNewComment post={post} open={open} handleClose={handleClose} />
      <div className="topicpostContent">
        <Link to={`post/${post?.postId}`} className="topicPosttextDate">
          <div className="topicpost">
            {post?.image && (
              <img className="topicpostImg" src={post?.image} alt="post" />
            )}
            <div className="topicpostInfoHomePage">
              <p className="topicpostDesc">{post?.text}</p>
              <span className="topicpostDate">
                {new Date(post?.createdAt).toDateString()}
              </span>
            </div>
          </div>
        </Link>
        {/* added post like and comment number acording to count */}
        <div className="topicpostIcons">
          <Link
            to={`userProfile/${userOfPost?.userId}`}
            className="topicpostIconsUsername"
          >
            <Box className="topicpostAvatarIcon">
              <Avatar
                className="topicpostAvatarIconAvatar"
                alt="Profil Foto"
                src={userOfPost?.avatar}
              />
              <p>{authUser && "@" + userOfPost?.userName}</p>
            </Box>
          </Link>
          <div onClick={id?.length === 0 ? onLike : onUnlike}>
            <Tooltip title={likeCounts}>
              {id?.length === 0 ? (
                <RecommendRoundedIcon />
              ) : (
                <RecommendOutlinedIcon />
              )}
            </Tooltip>
          </div>

          <div>
            <Tooltip
              onClick={handleOpen}
              title={
                `${post?._count?.comments}` <= 1
                  ? `${post?._count?.comments} Comment`
                  : `${post?._count?.comments} Comments`
              }
            >
              <MarkChatUnreadIcon
                style={{ margin: "0 2% " }}
                disable={authUser && true}
              />
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Share">
              <ShareRoundedIcon style={{ margin: "0 2% " }} />
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}
