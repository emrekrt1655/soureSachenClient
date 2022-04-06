import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import Tooltip from "@mui/material/Tooltip";
import "./post.css";

export default function TopicPost({ post }) {
  const { authReducer, userReducer } = useSelector((state) => state);

  const authUser = authReducer?.user;

  const users = userReducer?.data;

  const userOfPost = users?.find((user) => user?.userId === post?.postUserId);

  return (
    <div className="postContent">
      <div className="post">
        {post?.image && (
          <img className="postImg" src={post?.image} alt="post" />
        )}
        <div className="postInfoHomePage">
          <p className="postDesc">{post?.text}</p>
          <span className="postDate">
            {new Date(post?.createdAt).toDateString()}
          </span>
        </div>
      </div>
      {/* added post like and comment number acording to count */}
      <div className="postIcons">
        <Box className="whotofollowavatar">
          <Avatar
            className="whotoFollowAvatar"
            alt="Profil Foto"
            src={userOfPost?.avatar}
          />
          <p>{authUser && "@" + userOfPost?.userName}</p>
        </Box>
        <div>
          <Tooltip
            title={
              `${post?._count?.likes}` <= 1
                ? `${post?._count?.likes} Like`
                : `${post?._count?.likes} Likes`
            }
          >
            <RecommendRoundedIcon disable={authUser && true} />
          </Tooltip>
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
              disable={authUser && true}
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
