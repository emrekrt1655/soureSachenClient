import "./post.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import Tooltip from "@mui/material/Tooltip";
import LikeUsers from "../likeUsers/LikeUsers";

export default function Post({ post, topicData, likeData }) {
  const topic = topicData?.filter((topic) => {
    return topic?.topicId === post?.postTopicId;
  });
  const [open, setOpen] = useState(false);

  const { authReducer } = useSelector((state) => state);
  const users = useSelector((state) => state?.userReducer?.data);
  const user = users?.find((user) => user?.userId === post.postUserId);
  const topicText = topic?.map(({ text }) => text);
  const topicId = topic?.map(({ topicId }) => topicId);
  const likes = likeData?.filter((like) => like?.likePostId === post?.postId);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          {post.image && (
            <img className="postImg" src={post.image} alt="post" />
          )}
          <div className="postInfoHomePage">
            <Link to={`/${topicId}`} currentPath="/">
              <p className="postTitle">{topicText}</p>
            </Link>
            <p className="postDesc">{post?.text}</p>
            <span className="postDate">
              {new Date(post.createdAt).toDateString()}
            </span>
          </div>
        </div>
        {/* added post like and comment number acording to count */}
        <div className="postIcons">
          <Link
            to={`/userProfile/${user?.userId}`}
            currentPath="/"
            className="postIconsUsername"
          >
            <Box className="whotofollowavatar">
              <Avatar
                className="whotoFollowAvatar"
                alt="Profil Foto"
                src={user?.avatar}
              />
              <p>{authReducer?.user && "@" + user?.userName}</p>
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
