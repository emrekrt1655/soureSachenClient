import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import LikeUsers from "../likeUsers/LikeUsers";
import "./singlePost.css";
import Comments from "./comments/Comments";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import { getLikes, like, unlike } from "../../redux/actions/likeAction";
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
  const likes = likeData?.filter((like) => like?.likePostId === post?.postId);
  const likeCounts =
    `${likes?.length}}` <= 1
      ? `${likes?.length} Like`
      : `${likes?.length} Likes`;
  const comments = commentData?.filter(
    (comment) => comment.commentPostId === post?.postId
  );

  const id = likes
    ?.filter((l) => l.likeUserId === authUser?.userId)
    ?.map(({ likeId }) => likeId);

  const handleOpenLikeUsers = () => setOpenLikeUsers(true);
  const handleCloseLikeUsers = () => setOpenLikeUsers(false);

  const likeState = {
    likePostId: post?.postId,
    likeUserId: authUser?.userId,
  };

  const onLike = () =>
    dispatch(like(likeState, access_token)).then(() => dispatch(getLikes()));
  const onUnlike = () =>
    dispatch(unlike(id, access_token)).then(() => dispatch(getLikes()));

  return (
    <>
      <LikeUsers
        openLikeUsers={openLikeUsers}
        handleCloseLikeUsers={handleCloseLikeUsers}
        likes={likes}
        users={users}
      />
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
              <span onClick={handleOpenLikeUsers}>
                {" "}
                {likes?.length > 0 ? likeCounts : ""}{" "}
              </span>
              <div className="toolPostComments">
                <Tooltip title="Comment">
                  <MarkChatUnreadIcon style={{ margin: "0 2% " }} />
                </Tooltip>
              </div>
              <span>
                {" "}
                {comments?.length > 0
                  ? comments?.length + " Comments"
                  : ""}{" "}
              </span>
              <div className="toolPostComments">
                <Tooltip title="Share">
                  <ShareRoundedIcon style={{ margin: "0 2% " }} />
                </Tooltip>
              </div>
            </div>
          </div>
          {comments &&
            comments.map((comment) => (
              <Comments key={comment?.commentId} comment={comment} />
            ))}
        </div>
      </div>
    </>
  );
}
