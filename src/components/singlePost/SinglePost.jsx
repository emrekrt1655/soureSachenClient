import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

import "./singlePost.css";
import Comments from "./comments/Comments";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";

export default function SinglePost({ post, topicTitle, userOfPost, comments }) {
  const { authReducer } = useSelector((state) => state);
  const authUser = authReducer?.user;

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <div className="singlePostRealPost">
          <div className="singlePostavatarTime">
            <div className="postImageTitleComments">
              <h1 className="singlePostTitle">{topicTitle?.text}</h1>
              <div className="singlePostAuthor">
                <Link className="link" to={`userProfile/${userOfPost?.userId}`}>
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
            <div className="toolPostComments">
              <Tooltip title="Like">
                <RecommendRoundedIcon style={{ margin: "0 2% " }} />
              </Tooltip>
            </div>
            <div className="toolPostComments">
              <Tooltip title="Comment">
                <MarkChatUnreadIcon style={{ margin: "0 2% " }} />
              </Tooltip>
            </div>
            <div className="toolPostComments">
              <Tooltip title="Share">
                <ShareRoundedIcon style={{ margin: "0 2% " }} />
              </Tooltip>
            </div>
          </div>
        </div>
        {comments &&
          comments.map((comment) => (
            <Comments key={comment?.commentPostId} comment={comment} />
          ))}
      </div>
    </div>
  );
}
