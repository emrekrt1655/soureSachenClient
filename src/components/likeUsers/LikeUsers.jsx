import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
//import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./likeUsers.scss"

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

export default function LikeUsers({
  openLikeUsers,
  handleCloseLikeUsers,
  likes,
  users,
}) {
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
        <Stack direction="column" spacing={2}>
          {likes &&
            likeUsers?.map((user, index) => (
              <Box
                key={index}
                className="likeUserfollowAvatarBox"
                onClick={() => [handleCloseLikeUsers()]}
              >
                <Box className="likeUserfollowAvatarBox__likeUserFollowAvatarName">
                  <Avatar
                    className="likeUserfollowAvatarBox__likeUserFollowAvatarName--likeUserFollowAvatar"
                    alt={user?.name}
                    src={user?.avatar}
                  />
                  <Typography variant="overline" display="block" gutterBottom>
                    {user?.name + " " + user?.surname}
                  </Typography>
                </Box>
                {/* <Button className="likeUserfollowAvatarBox__likeUserFollowButton" variant="contained">
                  Follow
                </Button> */}
              </Box>
            ))}
        </Stack>
      </Box>
    </Modal>
  );
}
