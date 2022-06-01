import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import "../../likeUsers/likeUsers.scss";
import { useSelector, useDispatch } from "react-redux";
import { follow, getFollowers } from "../../../redux/actions/followerAction";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 475,
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

export default function FollowerList({
  openFollower,
  handleCloseFollower,
  followers,
  users,
  followerData,
  user,
  access_token,
}) {
  let followerList = [];

  const dispatch = useDispatch();

  followers?.forEach((follower) => {
    let userFollower = users?.find(
      (user) => user.userId === follower?.followerId
    );
    if (userFollower !== undefined) followerList.push(userFollower);
  });

  const authFollowings = followerData
    ?.filter((following) => following?.followerId === user?.userId)
    ?.map((u) => u?.followedId);

  const authList = followerList?.find(
    (follower) => follower?.userId === user?.userId
  );

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
            followerList?.map((i, index) => (
              <Box
                key={index}
                className="likeUserfollowAvatarBox"
                // onClick={() => [handleCloseFollower()]}
              >
                <Box className="likeUserFollowAvatarName">
                  <Avatar
                    className="likeUserFollowAvatar"
                    alt={i?.name}
                    src={i?.avatar}
                  />
                  <Typography variant="overline" display="block" gutterBottom>
                    {i?.name + " " + i?.surname}
                  </Typography>
                </Box>

                {i?.userId ===
                authList?.userId ? null : authFollowings?.includes(
                    i?.userId
                  ) ? (
                  <Button className="likeUserFollowButton" variant="contained">
                    Following
                  </Button>
                ) : (
                  <Button
                    className="likeUserFollowButton"
                    variant="contained"
                    onClick={() => {
                      dispatch(
                        follow(
                          {
                            followerId: user?.userId,
                            followedId: i?.userId,
                          },
                          access_token
                        )
                      )?.then(() => dispatch(getFollowers(access_token)));
                    }}
                  >
                    Follow
                  </Button>
                )}
              </Box>
            ))}
        </Stack>
      </Box>
    </Modal>
  );
}
