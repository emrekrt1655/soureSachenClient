import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../../likeUsers/likeUsers.css";
import { useDispatch } from "react-redux";
import {
  deleteFollower,
  getFollowers,
} from "../../../redux/actions/followerAction";

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
  openFollowing,
  handleCloseFollowing,
  followings,
  users,
  access_token,
  currentUser,
  user,
}) {
  let followingList = [];
  let folIdList = [];
  const dispatch = useDispatch();
  followings?.forEach((following) => {
    let userFollowing = users?.find(
      (user) => user.userId === following?.followedId
    );
    if (userFollowing !== undefined) followingList.push(userFollowing);
  });

  users?.forEach((user) => {
    let userFollowing = followings?.find(
      (follow) => follow?.followedId === user?.userId
    );
    if (userFollowing !== undefined) folIdList.push(userFollowing?.folId);
  });

  const handleDeleteFollow = (folId, access_token) => {
    dispatch(deleteFollower(folId, access_token)).then(() =>
      dispatch(getFollowers(access_token))
    );
  };
  return (
    <Modal
      open={openFollowing}
      onClose={handleCloseFollowing}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction="column" spacing={2}>
          Followings
          {followings &&
            followingList?.map((following, index) => (
              <Box
                key={index}
                className="likeUserfollowAvatarBox"
                onClick={() => [handleCloseFollowing()]}
              >
                <Box className="likeUserFollowAvatarName">
                  <Avatar
                    className="likeUserFollowAvatar"
                    alt={following?.name}
                    src={following?.avatar}
                  />
                  <Typography variant="overline" display="block" gutterBottom>
                    {following?.name + " " + following?.surname}
                  </Typography>
                </Box>
                {currentUser?.userId === user?.userId && (
                  <Button
                    className="likeUserFollowButton"
                    variant="contained"
                    onClick={() =>
                      handleDeleteFollow(folIdList[index], access_token)
                    }
                  >
                    Unfollow
                  </Button>
                )}
              </Box>
            ))}
        </Stack>
      </Box>
    </Modal>
  );
}
