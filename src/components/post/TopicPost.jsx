import React, { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import LikeUsers from "../likeUsers/LikeUsers";
import "./post.css";

export default function TopicPost({ post, likeData }) {
  const { authReducer, userReducer } = useSelector((state) => state);
  const authUser = authReducer?.user;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const users = userReducer?.data;
  const userOfPost = users?.find((user) => user?.userId === post?.postUserId);
  const likes = likeData?.filter((like) => like?.likePostId === post?.postId);

  const likeCounts =
    `${post?._count?.likes}` <= 1
      ? `${post?._count?.likes} Like`
      : `${post?._count?.likes} Likes`;

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
        {/* added post like and comment number acording to count */}
        <div className="postIcons">
          <Link
            to={`userProfile/${userOfPost?.userId}`}
            currentPath="/"
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
          <div>
            <Tooltip title="Like">
              <RecommendRoundedIcon disable={authReducer?.user && true} />
            </Tooltip>

            {likes?.length > 0 ? (
              <span onClick={handleOpen}>{likeCounts}</span>
            ) : (
              <span>{likeCounts}</span>
            )}
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
