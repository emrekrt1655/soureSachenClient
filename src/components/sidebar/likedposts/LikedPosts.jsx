import { Link } from "react-router-dom";
import "./likedposts.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import { getLikes, like, unlike } from "../../../redux/actions/likeAction";
import { getComments } from "../../../redux/actions/commentAction";
import CreateNewComment from "../../newCommentAdd/CreateComment";

export default function Post({
  postData,
  topicData,
  likeData,
  user,
  access_token,
}) {
  const dispatch = useDispatch();
  const posts = postData;
  const topics = topicData;
  const authUserId = user?.userId;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let newList = [];

  posts?.map((post) => {
    return newList.push({
      postId: post.postId,
      count: post._count.comments + post._count.likes,
    });
  });

  newList?.sort(function (a, b) {
    return b.count - a.count;
  });

  const post = posts?.find((post) => post.postId === newList[0]?.postId);
  const topic = topics?.find((t) => {
    return t.topicId === post?.postTopicId;
  });

  const topicId = topic?.topicId;

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

  useEffect(() => {
    post?.postId && dispatch(getComments(post?.postId));
  }, [post?.postId, dispatch]);

  return (
    <>
      <CreateNewComment post={post} open={open} handleClose={handleClose} />
      <div className="postlked">
        {post?.image && (
          <Link to={`/post/${post?.postId}`} className="postlkedLink">
            <img
              className="postImgliked"
              src={post?.image}
              alt="mostLikedpost"
            ></img>
          </Link>
        )}
        <div className="posttextinfo">
          <div className="postInfo">
            <span className="likedPostTitle">
              <Link to={`/${topicId}`} className="link">
                {topic?.text}
              </Link>
            </span>
            <hr />
          </div>
          <Link to={`/post/${post?.postId}`} className="postlkedLink">
            <p className="likedPostDesc">{post?.text}</p>
          </Link>
          <div className="extrainfo">
            <span className="postDate">
              {new Date(post?.createdAt).toDateString()}
            </span>
          </div>
          <div className="extrainfo">
            <span onClick={id?.length === 0 ? onLike : onUnlike}>
              <Tooltip title={likeCounts}>
                {id?.length === 0 ? (
                  <RecommendRoundedIcon />
                ) : (
                  <RecommendOutlinedIcon />
                )}
              </Tooltip>
            </span>
            <Tooltip
              onClick={handleOpen}
              title={
                `${post?._count?.comments}` <= 1
                  ? `${post?._count?.comments} Comment`
                  : `${post?._count?.comments} Comments`
              }
            >
              <MarkChatUnreadIcon style={{ margin: "0 2% " }} />
            </Tooltip>
            <Tooltip title="Share">
              <ShareRoundedIcon style={{ margin: "0 2% " }} />
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}
