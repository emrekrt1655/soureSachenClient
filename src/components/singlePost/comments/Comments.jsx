import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import { Avatar, Grid, Paper } from "@material-ui/core";
import "./comments.css";
import { useDate } from "../../../utils/useDate";

function Comments({ comment, authUser, users }) {
  const day = useDate(comment?.createdAt);
  const userOfCommnets = users?.find(
    (user) => user?.userId === comment?.commentUserId
  );

  return (
    <div className="Comments">
      <Paper
        key={comment.commentPostId}
        style={{ padding: "40px 20px", marginTop: 20 }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Link
              to={`/userProfile/${userOfCommnets?.userId}`}
              className="commentIconsUserAvatar"
            >
              <Avatar alt="userName" src={userOfCommnets?.avatar} />
            </Link>
            <Tooltip className="CommentsLike">
              <RecommendRoundedIcon />

              {/* <RecommendOutlinedIcon /> */}
            </Tooltip>
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <div className="commentsAvatartName">
              <Link
                to={`/userProfile/${userOfCommnets?.userId}`}
                className="commentIconsUsername"
              >
                <p>{authUser?.user && "@" + userOfCommnets?.userName}</p>
              </Link>
            </div>
            <div className="commentText">
              <p style={{ textAlign: "left" }}>{comment?.text}</p>
              <p style={{ textAlign: "left", color: "gray" }}>{day}</p>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Comments;
