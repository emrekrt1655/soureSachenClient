import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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

export default function SinglePost({
  post,
  topicTitle,
  userOfPost,
  commentData,
  likeData,
}) {
  const dispatch = useDispatch();
  const { authReducer } = useSelector((state) => state);
  const users = useSelector((state) => state?.userReducer?.data);
  const authUser = authReducer?.user;
  const access_token = authReducer?.access_token;
  const [openLikeUsers, setOpenLikeUsers] = useState(false);
  const [open, setOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
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
      <CreateNewComment post={post} open={open} handleClose={handleClose} />
      <div className="singlePost">
        <div className="singlePostWrapper">
          <div className="singlePostRealPost">
            <div className="singlePostavatarTime">
              <div className="postImageTitleComments">
                <h1 className="singlePostTitle">{topicTitle?.text}</h1>
                <div className="singlePostAuthor">
                  <Link
                    className="link"
                    to={`userProfile/${userOfPost?.userId}`}
                  >
                    <Box className="avatarPostSingle">
                      <Avatar
                        className="whotoFollowAvatarComments"
                        alt="Profil Foto"
                        src={userOfPost?.avatar}
                      />
                      <p className="commentPostAvatar">
                        {authUser && "@" + userOfPost?.userName}
                      </p>
                    </Box>
                  </Link>
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
                <span className="singlePostDate">
                  {" "}
                  {new Date(post?.createdAt).toDateString()}
                </span>
              </div>
            </div>
            <div className="singlePostEdit">
              <div
                className="toolPostComments"
                onClick={id?.length === 0 ? onLike : onUnlike}
              >
                <Tooltip title="Like">
                  {id?.length === 0 ? (
                    <RecommendRoundedIcon />
                  ) : (
                    <RecommendOutlinedIcon />
                  )}
                </Tooltip>
              </div>
              <span onClick={handleOpenLikeUsers} style={{ cursor: "pointer" }}>
                {" "}
                {likes?.length > 0 ? likeCounts : ""}{" "}
              </span>
              <div className="toolPostComments">
                <Tooltip title="Comment" onClick={handleOpen}>
                  <MarkChatUnreadIcon style={{ margin: "0 2% " }} />
                </Tooltip>
              </div>
              <span onClick={showComment} style={{ cursor: "pointer" }}>
                {comments?.length > 0 ? commentCounts : ""}
              </span>
              <div className="toolPostComments">
                <Tooltip title="Share">
                  <ShareRoundedIcon style={{ margin: "0 2% " }} />
                </Tooltip>
              </div>
            </div>
          </div>
          <div className={!showComments && "comments"}>
            {comments &&
              comments.map((comment) => (
                <Comments key={comment?.commentId} comment={comment} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
