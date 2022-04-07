import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import HomeIcon from "@mui/icons-material/Home";
import EditNotificationsRoundedIcon from "@mui/icons-material/EditNotificationsRounded";
import SignpostRoundedIcon from "@mui/icons-material/SignpostRounded";
import FollowTheSignsRoundedIcon from "@mui/icons-material/FollowTheSignsRounded";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import Badge from "@mui/material/Badge";

const drawerWidth = 100;

export default function LeftBarPostTopic() {
  const { authReducer } = useSelector((state) => state);

  return (
    <Box>
      <CssBaseline />
      <div>
        {authReducer?.access_token && (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={authReducer?.user?.avatar}
              alt="avatar"
            />
          </Link>
        )}
      </div>
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
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <div style={{ margin: "25px", position: "relative" }}>
            {authReducer?.access_token && (
              <Link className="link" to="/settings">
                <img
                  className="topImg"
                  src={authReducer?.user?.avatar}
                  alt="avatar"
                />
              </Link>
            )}
          </div>
          <Divider />
          <div style={{ margin: "45px 25px" }}>
            <List>
              <ListItem button>
                <Link className="link" to="/">
                  <ListItemIcon
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <HomeIcon />
                  </ListItemIcon>
                </Link>
              </ListItem>
            </List>
            <List>
              <ListItem button>
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
                    <EditNotificationsRoundedIcon />
                  </Badge>
                </ListItemIcon>
              </ListItem>
            </List>
            <List>
              <ListItem button>
                <ListItemIcon
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <SignpostRoundedIcon />
                </ListItemIcon>
              </ListItem>
            </List>
            <List>
              <ListItem button>
                <ListItemIcon
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <FollowTheSignsRoundedIcon />
                </ListItemIcon>
              </ListItem>
            </List>
            <List>
              <ListItem button>
                <ListItemIcon
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <HistoryEduIcon />
                </ListItemIcon>
              </ListItem>
            </List>
          </div>
          <Divider />
          <div style={{ margin: "55px 25px 10px" }}>
            <List>
              <ListItem button>
                <ListItemIcon
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <SettingsIcon />
                </ListItemIcon>
              </ListItem>
            </List>
          </div>
        </Box>
      </Drawer>
    </Box>
  );
}
