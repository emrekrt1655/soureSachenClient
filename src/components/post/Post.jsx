import "./post.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import Tooltip from "@mui/material/Tooltip";

export default function Post({ post, topicData }) {
  const topic = topicData?.filter((topic) => {
    return topic?.topicId === post?.postTopicId;
  });
  const { authReducer } = useSelector((state) => state);
  const userReducer = useSelector((state) => state?.userReducer?.data);

  const user = userReducer?.find((user) => user?.userId === post.postUserId);
  console.log(user);

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
        <Box className="whotofollowavatar">
          <Avatar
            className="whotoFollowAvatar"
            alt="Profil Foto"
            src={user?.avatar}
          />
          <p>{authReducer?.user && user?.name}</p>
        </Box>
        <div>
          <Tooltip
            title={
              `${post?._count?.likes}` <= 1
                ? `${post?._count?.likes} Like`
                : `${post?._count?.likes} Likes`
            }
          >
            <RecommendRoundedIcon disable={authReducer?.user && true} />
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
  );
}
