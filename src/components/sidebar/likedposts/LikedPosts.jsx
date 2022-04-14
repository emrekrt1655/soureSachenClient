import { Link } from "react-router-dom";
import "./likedposts.css";
import { useDispatch } from "react-redux";
import Tooltip from "@mui/material/Tooltip";

import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import { getLikes, like, unlike } from "../../../redux/actions/likeAction";

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

  return (
    <div className="postlked">
      {post?.image && (
        <img className="postImgliked" src={post?.image} alt="mostLikedpost" />
      )}
      <div className="posttextinfo">
        <div className="postInfo">
          <span className="postTitle">
            <Link to={`/${topicId}`} className="link">
              {topic?.text}
            </Link>
          </span>
          <hr />
        </div>
        <p className="postDesc">{post?.text}</p>

        <div className="extrainfo">
          <span className="postDate">
            {new Date(post?.createdAt).toDateString()}
          </span>
        </div>
        <div>
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
  );
}
