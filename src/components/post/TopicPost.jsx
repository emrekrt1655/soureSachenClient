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
import LikeUsers from "../likeUsers/LikeUsers";
import "./post.css";
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
      <LikeUsers
        open={open}
        handleClose={handleClose}
        likes={likes}
        users={users}
      />
      <div className="postContent">
        <Link to={`post/${post?.postId}`}>
          <div className="post">
            {post?.image && (
              <img className="postImg" src={post?.image} alt="post" />
            )}
            <div className="postInfoHomePage">
              <p className="postDesc">{post?.text}</p>
              <span className="postDate">
                {new Date(post?.createdAt).toDateString()}
              </span>
            </div>
          </div>
        </Link>
        {/* added post like and comment number acording to count */}
        <div className="postIcons">
          <Link
            to={`userProfile/${userOfPost?.userId}`}
            className="postIconsUsername"
          >
            <Box className="whotofollowavatar">
              <Avatar
                className="whotoFollowAvatar"
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
