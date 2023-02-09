import "./post.scss";
import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
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
import { useDate } from "../../utils/useDate";

export default function Post({ authUser, post, topicData, likeData }) {
  const day = useDate(post?.createdAt);
  const params = useParams();
  const navigate = useNavigate();
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

  const onNavigate = () => {
    navigate(`/${user?.userId}/userProfile`);
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
      <CreateNewComment
        access_token={access_token}
        authUser={authUser}
        post={post}
        open={open}
        handleClose={handleClose}
      />
      <div className="postContent">
        <div className="postContent__post">
          {post.image && (
            <img
              className="postContent__post--postImg"
              src={post.image}
              alt="post"
            />
          )}

          <div className="postContent__post--postInfoHomePage">
            <Link
              className="postContent__post--postInfoHomePage__postTitleLink"
              to={`/${topicId}`}
            >
              <p className="postContent__post--postInfoHomePage__postTitleLink--postTitle">
                {topicText}
              </p>
            </Link>
            <Link className="postTitleLink" to={`/post/${post?.postId}`}>
              <p className="postDesc">{post?.text}</p>
            </Link>
            <span className="postContent__post--postInfoHomePage__postDate">
              {day}
            </span>
          </div>
        </div>
        {/* added post like and comment number acording to count */}
        <div className="postContent__postIcons">
          <Box className="postContent__postIcons--postAvatarIcon">
            <Tooltip title={authReducer.user && `@` + user?.userName}>
              <Avatar
                className="postContent__postIcons--postAvatarIcon__postAvatarIconAvatar"
                alt="Profil Foto"
                src={user?.avatar}
                onClick={
                  authReducer && !params.userId ? () => onNavigate() : null
                }
              />
            </Tooltip>
          </Box>
          <div onClick={id?.length === 0 ? onLike : onUnlike}>
            <Tooltip title={likeCounts}>
              {id?.length === 0 ? (
                <>
                  {" "}
                  <RecommendRoundedIcon />{" "}
                </>
              ) : (
                <>
                  {" "}
                  <RecommendOutlinedIcon />{" "}
                </>
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
                //disable={authReducer?.user ? true : false}
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
