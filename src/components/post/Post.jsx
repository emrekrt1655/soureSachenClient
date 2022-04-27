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
import LikeUsers from "../likeUsers/LikeUsers";
import { getLikes, like, unlike } from "../../redux/actions/likeAction";

export default function Post({ post, topicData, likeData }) {
  const dispatch = useDispatch();
  const topic = topicData?.filter((topic) => {
    return topic?.topicId === post?.postTopicId;
  });
  const [open, setOpen] = useState(false);

  const { authReducer } = useSelector((state) => state);
  const authUserId = authReducer?.user?.userId;
  const access_token = authReducer?.access_token;
  const users = useSelector((state) => state?.userReducer?.data);
  const user = users?.find((user) => user?.userId === post.postUserId);
  const topicText = topic?.map(({ text }) => text);
  const topicId = topic?.map(({ topicId }) => topicId);
  const likes = likeData?.filter((like) => like?.likePostId === post?.postId);
  const handleOpen = () => setOpen(true);
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
    dispatch(like(likeState, access_token)).then(() => dispatch(getLikes()));
  const onUnlike = () =>
    dispatch(unlike(id, access_token)).then(() => dispatch(getLikes()));

  return (
    <>
      <LikeUsers
        open={open}
        handleClose={handleClose}
        likes={likes}
        users={users}
      />
      <div className="postContent">
        <div className="post">
          {post.image && (
            <img className="postImg" src={post.image} alt="post" />
          )}
          <div className="postInfoHomePage">
            <Link className="postTitleLink" to={`/${topicId}`}>
              <p className="postTitle">{topicText}</p>
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
            to={`/userProfile/${user?.userId}`}
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
              <ShareRoundedIcon style={{ margin: "0 2% " }} />
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}
