import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import "./singlePost.css";

export default function SinglePost({ post, topicTitle, userOfPost }) {
  const { authReducer } = useSelector((state) => state);
  const authUser = authReducer?.user;

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <div className="singlePostavatarTime">
          <div>
            <img className="singlePostImg" src={post?.image} alt="postImage" />
          </div>
          <div className="singlePostInfo">
            <div className="singlePostAuthor">
              <Link className="link" to={`userProfile/${userOfPost?.userId}`}>
                <Box className="avatarPostSingle">
                  <Avatar
                    className="whotoFollowAvatar"
                    alt="Profil Foto"
                    src={userOfPost?.avatar}
                  />
                  <p>{authUser && "@" + userOfPost?.userName}</p>
                </Box>
              </Link>
            </div>
            <h1 className="singlePostTitle">{topicTitle?.text}</h1>
            <span className="singlePostDate">
              {" "}
              {new Date(post?.createdAt).toDateString()}
            </span>
          </div>
        </div>
        <p className="singlePostDesc">{post?.text}</p>
        <div className="singlePostEdit">
          <i className="singlePostIcon far fa-trash-alt"></i>
        </div>
      </div>
    </div>
  );
}
