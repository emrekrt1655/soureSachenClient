import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import "../../likeUsers/likeUsers.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 325,
  height: 325,
  bgcolor: "#ffffff",
  borderRadius: "5%",
  border: "none",
  boxShadow: 24,
  p: 8,
  overflowY: "scroll",
  display: "flex",
  flexDirection: "column",
};

export default function FollowerList({
  openFollower,
  handleCloseFollower,
  followers,
  users,
}) {
  let followerList = [];

  followers?.forEach((follower) => {
    let userFollower = users?.find(
      (user) => user.userId === follower?.followerId
    );
    if (userFollower !== undefined) followerList.push(userFollower);
  });

  return (
    <Modal
      open={openFollower}
      onClose={handleCloseFollower}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction="column" spacing={2}>
          Followers
          {followers &&
            followerList?.map((follower, index) => (
              <Box
                key={index}
                className="likeUserfollowAvatarBox"
                onClick={() => [handleCloseFollower()]}
              >
                <Box className="likeUserFollowAvatarName">
                  <Avatar
                    className="likeUserFollowAvatar"
                    alt={follower?.name}
                    src={follower?.avatar}
                  />
                  <Typography variant="overline" display="block" gutterBottom>
                    {follower?.name + " " + follower?.surname}
                  </Typography>
                </Box>
              </Box>
            ))}
        </Stack>
      </Box>
    </Modal>
  );
}
