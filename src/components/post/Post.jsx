import "./post.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import Tooltip from "@mui/material/Tooltip";
import CreateNewComment from "../newCommentAdd/CreateComment";
import { getLikes, like, unlike } from "../../redux/actions/likeAction";
import { typeText } from "../../redux/actions/alertAction";
import ShareButton from "../shareButton/ShareButton";

export default function Post({ post, topicData, likeData }) {
  const dispatch = useDispatch();
  const topic = topicData?.filter((topic) => {
    return topic?.topicId === post?.postTopicId;
  });
  const [open, setOpen] = useState(false);
  const [openShareButton, setopenShareButton] = useState(false);
  const [shareLink, setShareLink] = useState("");

  const { authReducer } = useSelector((state) => state);
  const authUserId = authReducer?.user?.userId;
  const access_token = authReducer?.access_token;
  const users = useSelector((state) => state?.userReducer?.data);
  const user = users?.find((user) => user?.userId === post.postUserId);
  const topicText = topic?.map(({ text }) => text);
  const topicId = topic?.map(({ topicId }) => topicId);
  const likes = likeData?.filter((like) => like?.likePostId === post?.postId);

  const handleOpenShare = () => {
    setopenShareButton(true);
    setShareLink(`/post/${post?.postId}`);
  };

  const closeShareButton = () => setopenShareButton(false);

  const handleOpen = () => {
    authUserId
      ? setOpen(true)
      : dispatch(typeText("Please Login now to comment!"));
  };
  const handleClose = () => setOpen(false);
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
    authUserId
      ? dispatch(like(likeState, access_token)).then(() => dispatch(getLikes()))
      : dispatch(typeText("Please Login now to like!"));
  const onUnlike = () =>
    authUserId &&
    dispatch(unlike(id, access_token)).then(() => dispatch(getLikes()));

  return (
    <>
      <CreateNewComment post={post} open={open} handleClose={handleClose} />
      <div className="postContent">
        <div className="post">
          {post.image && (
            <img className="postImg" src={post.image} alt="post" />
          )}
          <div className="postInfoHomePage">
            <Link className="postTitleLink" to={`/${topicId}`}>
              <p className="postTitle">{topicText}</p>
            </Link>
            <Link className="postTitleLink" to={`post/${post?.postId}`}>
              <p className="postDesc">{post?.text}</p>
            </Link>
            <span className="postDate">
              {new Date(post.createdAt).toDateString()}
            </span>
          </div>
        </div>
        {/* added post like and comment number acording to count */}
        <div className="postIcons">
          <Link
            to={authUserId && `/userProfile/${user?.userId}`}
            className="postIconsUsername"
          >
            <Box className="postAvatarIcon">
              <Avatar
                className="postAvatarIconAvatar"
                alt="Profil Foto"
                src={user?.avatar}
              />
              <p>{authReducer?.user && "@" + user?.userName}</p>
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
                disable={authReducer?.user && true}
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
            <ShareButton
              shareLink={shareLink}
              openShareButton={openShareButton}
              closeShareButton={closeShareButton}
            />
          </div>
        </div>
      </div>
    </>
  );
}
