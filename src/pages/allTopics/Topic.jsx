import React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate, useParams } from "react-router-dom";
import { useDate } from "../../utils/useDate";
import "./topics.scss";

const Topic = ({ topic, users }) => {
  const user = users?.find((user) => user?.userId === topic.topicUserId);
  const navigate = useNavigate();
  const { userId } = useParams();
  const onNavigate = () => {
    !userId && navigate(`/${user?.userId}/topics`);
  };

  const dateOfTopic = useDate(topic?.createdAt);

  return (
    <Paper className="listWrapper">
      <ListItem alignItems="flex-start">
        <ListItemAvatar onClick={() => navigate(`/${topic?.topicId}`)}>
          <Tooltip title={`Go to topic page`}>
            <Avatar alt={topic?.topicId} src={topic?.image} />
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
                {topic?._count.posts > 0
                  ? topic?._count.posts + " Opinions"
                  : "There is no opinion about this topic."}
              </Typography>
              <Divider variant="inset" component="li" />
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {dateOfTopic}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>

      <Divider variant="inset" component="li" />
      <ListItemAvatar className="userAvatar">
        <Tooltip title={`@${user?.userName}`}>
          <Avatar
            alt={user?.userName}
            src={user?.avatar}
            onClick={() => navigate(`/${user?.userId}/userProfile`)}
          />
        </Tooltip>
        <Typography
          sx={{ display: "inline" }}
          component="span"
          variant="body2"
          color="text.primary"
          className="userAvatar__nameSurname"
        >
          <span>{user?.name + " "}</span> <span>{user?.surname}</span>
        </Typography>
        <Typography
          sx={{ display: "inline" }}
          component="span"
          variant="body2"
          color="text.primary"
          className="userAvatar__nameSurname"
          onClick={() => onNavigate()}
        >
          {user?._count?.topics} Topics
        </Typography>
      </ListItemAvatar>
    </Paper>
  );
};

export default Topic;
