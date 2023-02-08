import { Link } from "react-router-dom";
import "./likedposts.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import { getLikes, like, unlike } from "../../../redux/actions/likeAction";
import { typeText } from "../../../redux/actions/alertAction";
import CreateNewComment from "../../newCommentAdd/CreateComment";
import ShareButton from "../../shareButton/ShareButton";
import moment from "moment"

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
  const handleOpen = () => {
    authUserId
      ? setOpen(true)
      : dispatch(typeText("Please Login now to comment!"));
  };
  const handleClose = () => setOpen(false);

  const [openShareButton, setOpenShareButton] = useState(false);
  const [shareLink, setShareLink] = useState("");

  const handleCloseShareButton = () => setOpenShareButton(false);

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

  const likedPost = posts?.find((post) => post.postId === newList[0]?.postId);
  const topic = topics?.find((t) => {
    return t.topicId === likedPost?.postTopicId;
  });

  const topicId = topic?.topicId;

  const handleOpenShare = () => {
    setOpenShareButton(true);
    setShareLink(`/post/${likedPost?.postId}`);
  };

  const likes = likeData?.filter(
    (like) => like?.likePostId === likedPost?.postId
  );
  const likeCounts =
    `${likes?.length}}` <= 1
      ? `${likes?.length} Like`
      : `${likes?.length} Likes`;
  const likeState = {
    likePostId: likedPost?.postId,
    likeUserId: authUserId,
  };

  const id = likes
    ?.filter((l) => l.likeUserId === authUserId)
    ?.map(({ likeId }) => likeId);

  const onLike = () =>
    authUserId
      ? dispatch(like(likeState, access_token)).then(() => dispatch(getLikes()))
      : dispatch(typeText("Please Login now to like!"));
  const onUnlike = () =>
    authUserId &&
    dispatch(unlike(id, access_token)).then(() => dispatch(getLikes()));

  return (
    <>
      <ShareButton
        shareLink={shareLink}
        openShareButton={openShareButton}
        closeShareButton={handleCloseShareButton}
      />
      <CreateNewComment
        authUser={user}
        access_token={access_token}
        post={likedPost}
        open={open}
        handleClose={handleClose}
      />
      <div className="postlked">
        {likedPost?.image && (
          <Link to={`/post/${likedPost?.postId}`} className="postlked__postlkedLink">
            <img
              className="postlked__postlkedLink--postImgliked"
              src={likedPost?.image}
              alt="mostLikedpost"
            ></img>
          </Link>
        )}
        <div className="postlked__posttextinfo">
          <div className="postlked__posttextinfo--postInfo">
            <span className="postlked__posttextinfo--postInfo__likedPostTitle">
              <Link to={`/${topicId}`} className="postlked__posttextinfo--postInfo__likedPostTitle--link">
                {topic?.text}
              </Link>
            </span>
            <hr />
          </div>
          <Link to={`/post/${likedPost?.postId}`} className="postlked__posttextinfo--postlkedLink">
            <p className="postlked__posttextinfo--postlkedLink__likedPostDesc">{likedPost?.text}</p>
          </Link>
          <div className="postlked__posttextinfo--extrainfo">
            <span className="postlked__posttextinfo--extrainfo__postDate">
              {moment(likedPost?.createdAt).fromNow()}
            </span>
          </div>
          <div className="postlked__posttextinfo--extrainfo">
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
                `${likedPost?._count?.comments}` <= 1
                  ? `${likedPost?._count?.comments} Comment`
                  : `${likedPost?._count?.comments} Comments`
              }
            >
              <MarkChatUnreadIcon style={{ margin: "0 2% " }} />
            </Tooltip>
            <Tooltip title="Share">
              <ShareRoundedIcon
                onClick={handleOpenShare}
                style={{ margin: "0 2% " }}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}
