import React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { useLikedPost } from "../../utils/useLikedPost";
import { useNavigate } from "react-router-dom";
import "./topics.scss";

const Topic = ({ topic, users, posts }) => {
  const user = users?.find((user) => user?.userId === topic.topicUserId);
  const navigate = useNavigate();
  const postData = posts?.filter(
    (post) => post?.postTopicId === topic?.topicId
  );

  const likedPost = useLikedPost(postData);
  console.log("likedPost.postText?.length ", likedPost?.postText?.length);

  return (
      <Paper className="listWrapper" >
        <ListItem alignItems="flex-start">
          <ListItemAvatar onClick={() => navigate(`/${user?.userId}/userProfile`)}  >
            <Tooltip title={`@${user?.userName}`}>
            <Avatar alt="Travis Howard" src={user?.avatar} />
            </Tooltip>
          </ListItemAvatar>
          <ListItemText
          onClick={() => navigate(`/${topic?.topicId}`)}
            primary={topic?.text}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {likedPost?.postText
                    ? likedPost?.postText?.length < 100
                      ? likedPost?.postText
                      : likedPost?.postText?.slice(0, 100) + "..."
                    : "There is no opinion about this topic."}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </Paper>
  );
};

export default Topic;
