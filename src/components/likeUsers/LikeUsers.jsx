import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
//import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./likeUsers.scss";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "40%",
  transform: "translate(-50%, -50%)",
  width: "20%",
  height: "50%",
  bgcolor: "#ffffff",
  borderRadius: "5%",
  border: "none",
  boxShadow: 24,
  p: 8,
  overflowY: "scroll",
  display: "flex",
  flexDirection: "column",
};

export default function LikeUsers({
  openLikeUsers,
  handleCloseLikeUsers,
  likes,
  users,
}) {
  const navigate = useNavigate();
  let likeUsers = [];

  likes?.forEach((like) => {
    let userLike = users?.find((user) => user.userId === like?.likeUserId);
    if (userLike !== undefined) likeUsers.push(userLike);
  });

  return (
    <Modal
      open={openLikeUsers}
      onClose={handleCloseLikeUsers}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Paper direction="column" spacing={2}>
          {likes &&
            likeUsers?.map((user, index) => (
              <Box
                key={index}
                className="likeUserfollowAvatarBox"
                onClick={() => [handleCloseLikeUsers()]}
              >
                <Box
                  className="likeUserfollowAvatarBox__likeUserFollowAvatarName"
                  onClick={() => navigate(`/${user?.userId}/userProfile`)}
                >
                  <Avatar
                    className="likeUserfollowAvatarBox__likeUserFollowAvatarName--likeUserFollowAvatar"
                    alt={user?.name}
                    src={user?.avatar}
                  />
                  <Typography
                    display="block"
                    gutterBottom
                    className="likeUserfollowAvatarBox__likeUserFollowAvatarName--likeUserFollowUsername"
                  >
                    {"@" + user?.userName}
                  </Typography>
                </Box>
                {/* <Button className="likeUserfollowAvatarBox__likeUserFollowButton" variant="contained">
                  Follow
                </Button> */}
              </Box>
            ))}
        </Paper>
      </Box>
    </Modal>
  );
}
