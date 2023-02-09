import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import CreateNewComment from "../newCommentAdd/CreateComment";
import "./topicPost.scss";
import { getLikes, like, unlike } from "../../redux/actions/likeAction";
import { typeText } from "../../redux/actions/alertAction";
import ShareButton from "../shareButton/ShareButton";
import { useDate } from "../../utils/useDate";

export default function TopicPost({ post, likeData }) {
  const day = useDate(post?.createdAt);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authReducer, userReducer } = useSelector((state) => state);
  const authUserId = authReducer?.user?.userId;
  const access_token = authReducer?.access_token;
  const [open, setOpen] = useState(false);
  const [openShareButton, setOpenShareButton] = useState(false);
  const [shareLink, setShareLink] = useState("");

  const handleOpenShare = () => {
    setOpenShareButton(true);
    setShareLink(`/post/${post?.postId}`);
  };

  const handleCloseShareButton = () => setOpenShareButton(false);

  const handleOpen = () => {
    authUserId
      ? setOpen(true)
      : dispatch(typeText("Please Login now to comment!"));
  };
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
    authUserId &&
    dispatch(like(likeState, access_token)).then(() => dispatch(getLikes()));
  const onUnlike = () =>
    authUserId &&
    dispatch(unlike(id, access_token)).then(() => dispatch(getLikes()));

  return (
    <>
      <ShareButton
        shareLink={shareLink}
        openShareButton={openShareButton}
        closeShareButton={handleCloseShareButton}
      />
      <CreateNewComment
        access_token={access_token}
        authUser={authReducer?.user}
        post={post}
        open={open}
        handleClose={handleClose}
      />
      <div className="topicpostContent">
        <div
          className="topicpostContent__topicPosttextDate--topicpost"
          onClick={() => navigate(post && `/post/${post?.postId}`)}
        >
          {post?.image && (
            <img
              className="topicpostContent__topicPosttextDate--topicpost__topicpostImg"
              src={post?.image}
              alt="post"
            />
          )}
          <div className="topicpostContent__topicPosttextDate--topicpost__topicpostInfoHomePage">
            <p className="topicpostContent__topicPosttextDate--topicpost__topicpostInfoHomePage--topicpostDesc">
              {post?.text}
            </p>
            <span className="topicpostContent__topicPosttextDate--topicpost__topicpostInfoHomePage--topicpostDate">
              {day}
            </span>
          </div>
        </div>
        {/* added post like and comment number acording to count */}
        <div className="topicpostContent__topicPostIcons">
          <Box className="topicpostContent__topicPostIcons--topicpostIconsUsername__topicpostAvatarIcon">
            <Tooltip title={`@` + userOfPost?.userName}>
              <Avatar
                onClick={() =>
                  navigate(
                    authReducer?.user && `/${userOfPost?.userId}/userProfile`
                  )
                }
                className="topicpostContent__topicPostIcons--topicpostIconsUsername__topicpostAvatarIcon--topicpostAvatarIconAvatar"
                alt="Profil Foto"
                src={userOfPost?.avatar}
              />
            </Tooltip>
          </Box>
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
              onClick={authReducer?.user ? handleOpen : null}
              title={
                `${post?._count?.comments}` <= 1
                  ? `${post?._count?.comments} Comment`
                  : `${post?._count?.comments} Comments`
              }
            >
              <MarkChatUnreadIcon
                style={{ margin: "0 2% " }}
                //disable={authUser ? true : false}
              />
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Share">
              <ShareRoundedIcon
                onClick={handleOpenShare}
                style={{ margin: "0 2% " }}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}
