import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import RecommendRoundedIcon from "@mui/icons-material/RecommendRounded";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import { Avatar, Grid, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
import "./comments.css";

function Comments({ comment }) {
  const { authReducer, userReducer } = useSelector((state) => state);
  const authUserId = authReducer?.user?.userId;

  const users = userReducer?.data;
  const userOfCommnets = users?.find(
    (user) => user?.userId === comment?.commentUserId
  );

  console.log(comment);
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
              className="postIconsUsername"
            >
              <Avatar alt="userName" src={userOfCommnets?.avatar} />
            </Link>
            <Tooltip className="CommentsLike">
              <RecommendRoundedIcon />

              {/* <RecommendOutlinedIcon /> */}
            </Tooltip>
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>
              <Link
                to={`/userProfile/${userOfCommnets?.userId}`}
                className="postIconsUsername"
              >
                <p>{authReducer?.user && "@" + userOfCommnets?.userName}</p>
              </Link>
            </h4>
            <p style={{ textAlign: "left" }}>{comment?.text}</p>
            <p style={{ textAlign: "left", color: "gray" }}>
              {new Date(comment?.createdAt).toDateString()}
            </p>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Comments;
