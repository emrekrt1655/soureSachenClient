import "./post.css";
import { Link } from "react-router-dom";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import Tooltip from "@mui/material/Tooltip";

export default function Post({ post, topicData }) {
  const topic = topicData?.filter((topic) => {
    return topic?.topicId === post?.postTopicId;
  });

  const topicText = topic?.map(({ text }) => text);
  const topicId = topic?.map(({ topicId }) => topicId);

  return (
    <div className="postContent">
      <div className="post">
        {post.image && <img className="postImg" src={post.image} alt="post" />}
        <div className="postInfoHomePage">
          <Link to={`topic/${topicId}`}>
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
        </div>
        <div>
          <Tooltip
            title={
              `${post?._count?.comments}` <= 1
                ? `${post?._count?.likes} Comment`
                : `${post?._count?.likes} Comments`
            }
          >
            <MarkChatUnreadIcon style={{ margin: "0 2% " }} />
          </Tooltip>
        </div>
        <div>
          <Tooltip title="Share">
            <ShareRoundedIcon style={{ margin: "0 2% " }} />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
