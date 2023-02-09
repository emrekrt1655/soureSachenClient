import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import LikeUsers from "../likeUsers/LikeUsers";
import "./singlePost.css";
import Comments from "./comments/Comments";
import CreateNewComment from "../newCommentAdd/CreateComment";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import { getLikes, like, unlike } from "../../redux/actions/likeAction";
import { typeText } from "../../redux/actions/alertAction";
import { useState } from "react";
import ShareButton from "../shareButton/ShareButton";
import { useDate } from "../../utils/useDate";

export default function SinglePost({
  post,
  topicTitle,
  userOfPost,
  commentData,
  likeData,
  authUser,
  access_token,
  users,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const day = useDate(post?.createdAt);

  const [openLikeUsers, setOpenLikeUsers] = useState(false);
  const [open, setOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [openShareButton, setopenShareButton] = useState(false);

  const handleOpenShare = () => {
    setopenShareButton(true);
  };

  const closeShareButton = () => setopenShareButton(false);

  const shareLink = window.location.href;

  const likes = likeData?.filter((like) => like?.likePostId === post?.postId);
  const likeCounts =
    `${likes?.length}}` <= 1
      ? `${likes?.length} Like`
      : `${likes?.length} Likes`;
  const comments = commentData?.filter(
    (comment) => comment.commentPostId === post?.postId
  );
  const commentCounts =
    `${comments?.length}}` <= 1
      ? `${comments?.length} Comment`
      : `${comments?.length} Comments`;

  const id = likes
    ?.filter((l) => l.likeUserId === authUser?.userId)
    ?.map(({ likeId }) => likeId);

  const handleOpenLikeUsers = () => {
    authUser?.userId
      ? setOpenLikeUsers(true)
      : dispatch(typeText("Please Login now to see who likes this opinion!"));
  };
  const handleCloseLikeUsers = () => setOpenLikeUsers(false);
  const handleOpen = () => {
    authUser?.userId
      ? setOpen(true)
      : dispatch(typeText("Please Login now to comment!"));
  };
  const handleClose = () => setOpen(false);

  const likeState = {
    likePostId: post?.postId,
    likeUserId: authUser?.userId,
  };

  const onLike = () =>
    authUser?.userId
      ? dispatch(like(likeState, access_token)).then(() => dispatch(getLikes()))
      : dispatch(typeText("Please Login now to Like!"));
  const onUnlike = () =>
    dispatch(unlike(id, access_token)).then(() => dispatch(getLikes()));

  const showComment = () => {
    authUser?.userId
      ? setShowComments(!showComments)
      : dispatch(typeText("Please Login to see comments!"));
  };

  return (
    <>
      <LikeUsers
        openLikeUsers={openLikeUsers}
        handleCloseLikeUsers={handleCloseLikeUsers}
        likes={likes}
        users={users}
      />
      <CreateNewComment
        access_token={access_token}
        authUser={authUser}
        post={post}
        open={open}
        handleClose={handleClose}
      />
      <div className="singlePost">
        <div className="singlePostWrapper">
          <div className="singlePostRealPost">
            <div className="singlePostavatarTime">
              <div className="postImageTitleComments">
                <h1 className="singlePostTitle">{topicTitle?.text}</h1>
                <div className="singlePostAuthor">
                  <Box
                    className="avatarPostSingle"
                    onClick={() =>
                      navigate(`/${userOfPost?.userId}/userProfile`)
                    }
                  >
                    <Avatar
                      className="whotoFollowAvatarComments"
                      alt="Profil Foto"
                      src={userOfPost?.avatar}
                    />
                    <p className="commentPostAvatar">
                      {authUser && "@" + userOfPost?.userName}
                    </p>
                  </Box>
                </div>
                {post?.image ? (
                  <img
                    className="singlePostImg"
                    src={post?.image}
                    alt="postImage"
                  />
                ) : (
                  <img
                    className="singlePostImg"
                    src="https://wallpaperaccess.com/full/3800967.jpg"
                    alt="postImage"
                  />
                )}
              </div>
            </div>
            <div className="postTextTime">
              <p className="singlePostDesc">{post?.text}</p>
              <div className="singlePostInfo">
                <span className="singlePostDate"> {day}</span>
              </div>
            </div>
            <div className="singlePostEdit">
              <div className="iconBoxy">
                <div
                  className="toolPostComments"
                  onClick={id?.length === 0 ? onLike : onUnlike}
                >
                  <Tooltip title="Like">
                    {id?.length === 0 ? (
                      <span>
                        <RecommendRoundedIcon />{" "}
                      </span>
                    ) : (
                      <span>
                        {" "}
                        <RecommendOutlinedIcon />{" "}
                      </span>
                    )}
                  </Tooltip>
                </div>
                <span onClick={handleOpenLikeUsers}>
                  {likes?.length > 0 ? likeCounts : ""}{" "}
                </span>
              </div>
              <div className="iconBoxy">
                <div className="toolPostComments">
                  <Tooltip title="Comment" onClick={handleOpen}>
                    <MarkChatUnreadIcon style={{ margin: "0 2% " }} />
                  </Tooltip>
                </div>
                <span onClick={showComment}>
                  {comments?.length > 0 ? commentCounts : ""}
                </span>
              </div>
              <div className="iconBoxy">
                <div className="toolPostComments">
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
          </div>
          <div className={!showComments ? "comments" : null}>
            {comments &&
              comments.map((comment) => (
                <Comments
                  key={comment?.commentId}
                  users={users}
                  comment={comment}
                  authUser={authUser}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
