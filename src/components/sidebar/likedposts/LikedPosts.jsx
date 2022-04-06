import { Link } from "react-router-dom";
import "./likedposts.css";
import { useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";

import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";

export default function Post({ postData }) {
  const { postReducer, topicReducer } = useSelector((state) => state);
  const posts = postData ? postData : postReducer?.data;
  const topics = topicReducer?.data;

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

  return (
    <div className="postlked">
      {post?.image && (
        <img className="postImgliked" src={post?.image} alt="mostLikedpost" />
      )}
      <div className="posttextinfo">
        <div className="postInfo">
          <span className="postTitle">
            <Link to="/post/abc" className="link">
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
          <Tooltip
            title={
              `${post?._count?.likes}` <= 1
                ? `${post?._count?.likes} Like`
                : `${post?._count?.likes} Likes`
            }
          >
            <RecommendRoundedIcon />
          </Tooltip>
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
