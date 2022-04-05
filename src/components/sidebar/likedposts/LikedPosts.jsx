import { Link } from "react-router-dom";
import "./likedposts.css";
import { useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";

import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
// import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";

export default function Post({ img }) {
  const { postReducer, topicReducer } = useSelector((state) => state);
  const posts = postReducer?.data;
  const topics = topicReducer?.data;

  // console.log("postReducer :>> ", posts);
  let newList = [];
  // console.log(posts);

  posts?.map((post) => {
    return newList.push({
      postId: post.postId,
      count: post._count.comments + post._count.likes,
    });
  });

  newList?.sort(function (a, b) {
    return b.count - a.count;
  });
  // console.log("newList :>> ", newList);

  const post = posts?.find((post) => post.postId === newList[0].postId);

  const topic = topics?.find((t) => {
    return t.topicId === post?.postTopicId;
  });
  // console.log("topic :>> ", topic);

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
          <div className="postCats">
            <span className="postCat">
              <Link className="link" to="/posts?cat=Music">
                Music
              </Link>
            </span>
            <span className="postCat">
              <Link className="link" to="/posts?cat=Music">
                Life
              </Link>
            </span>
          </div>
          <div>
            <span className="postDate">
              {new Date(post?.createdAt).toDateString()}
            </span>
          </div>
        </div>
        <div>
          <Tooltip title="Like">
            <RecommendRoundedIcon />
          </Tooltip>
          <Tooltip title="Comment">
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
