import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
//import EditNotificationsRoundedIcon from "@mui/icons-material/EditNotificationsRounded";
import SignpostRoundedIcon from "@mui/icons-material/SignpostRounded";
import FollowTheSignsRoundedIcon from "@mui/icons-material/FollowTheSignsRounded";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
//import Badge from "@mui/material/Badge";
import "./leftBarPostTopic.scss";

const drawerWidth = 100;

export default function LeftBarPostTopic({ handleOpen, post }) {
  const { authReducer } = useSelector((state) => state);
  const navigate = useNavigate();
  return (
    <Box>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          <div className="authUserImgBox">
            {authReducer?.access_token && (
              <Toolbar title="Go 2 ur profile">
                <img
                  onClick={() =>
                    navigate(`/userProfile/${authReducer?.user?.userId}`)
                  }
                  className="topImgLeftBar"
                  style={{ fontsize: "35px" }}
                  src={authReducer?.user?.avatar}
                  alt="avatar"
                />
              </Toolbar>
            )}
          </div>
          <Divider />
          <div className="iconBox">
            <List>
              <ListItem>
                <ListItemIcon
                  style={{ display: "flex", flexDirection: "column" }}
                  id="icon"
                >
                  <Toolbar title="Homepage">
                    {" "}
                    <HomeIcon
                      className="fontSizeLeftbarIcon"
                      onClick={() => navigate("/")}
                    />{" "}
                  </Toolbar>
                </ListItemIcon>
              </ListItem>
            </List>
            {/* <List>
              <ListItem >
                <ListItemIcon
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {" "}
                  <Badge
                    color="success"
                    overlap="circular"
                    badgeContent={4}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <EditNotificationsRoundedIcon className="fontSizeLeftbarIcon" />
                  </Badge>
                </ListItemIcon>
              </ListItem>
            </List> */}
            <List>
              <ListItem>
                <ListItemIcon
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Toolbar title="Topic page">
                    {" "}
                    <SignpostRoundedIcon
                      className="fontSizeLeftbarIcon"
                      onClick={() => navigate(`/${post?.postTopicId}`)}
                    />{" "}
                  </Toolbar>
                </ListItemIcon>
              </ListItem>
            </List>
            <List>
              <ListItem>
                <ListItemIcon
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Toolbar title="User page">
                    {" "}
                    <FollowTheSignsRoundedIcon
                      className="fontSizeLeftbarIcon"
                      onClick={() =>
                        navigate(`/userProfile/${post?.postUserId}`)
                      }
                    />
                  </Toolbar>
                </ListItemIcon>
              </ListItem>
            </List>
            <List>
              <ListItem>
                <ListItemIcon
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Toolbar title="Give ur Opinion">
                    <HistoryEduIcon
                      className="fontSizeLeftbarIcon"
                      onClick={handleOpen}
                    />
                  </Toolbar>
                </ListItemIcon>
              </ListItem>
            </List>
          </div>
          <Divider />
          <div className="settingIconBox">
            <List>
              <ListItem>
                <ListItemIcon
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Toolbar title="Settings">
                    {" "}
                    <SettingsIcon
                      className="fontSizeLeftbarIcon"
                      onClick={() =>
                        navigate(`/settings/${authReducer.user.userId}`)
                      }
                    />{" "}
                  </Toolbar>
                </ListItemIcon>
              </ListItem>
            </List>
          </div>
        </Box>
      </Drawer>
    </Box>
  );
}
