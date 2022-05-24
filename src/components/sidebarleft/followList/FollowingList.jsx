import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../../likeUsers/likeUsers.css";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteFollower,
  getFollowers,
  follow,
} from "../../../redux/actions/followerAction";

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

export default function FollowingList({
  openFollowing,
  handleCloseFollowing,
  followings,
  users,
  access_token,
  currentUser,
  user,
  followerData,
}) {
  let followingList = [];

  const dispatch = useDispatch();
  followings?.forEach((following) => {
    let userFollowing = users?.find(
      (user) => user.userId === following?.followedId
    );
    if (userFollowing?.userId === following?.followedId)
      userFollowing.folId = following?.folId;
    if (userFollowing !== undefined) followingList.push(userFollowing);
  });

  const authFollowings = followerData
    ?.filter((following) => following?.followerId === user?.userId)
    ?.map((u) => u?.followedId);

  const authList = followingList?.find(
    (follower) => follower?.userId === user?.userId
  );
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
          {followings && currentUser?.userId === user?.userId
            ? followingList?.map((following, index) => (
                <Box
                  key={index}
                  className="likeUserfollowAvatarBox"
                  // onClick={() => [handleCloseFollowing()]}
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

                  <Button
                    className="likeUserFollowButton"
                    variant="contained"
                    onClick={() =>
                      handleDeleteFollow(following?.folId, access_token)
                    }
                  >
                    Unfollow
                  </Button>
                </Box>
              ))
            : followingList?.map((i, index) => (
                <Box
                  key={index}
                  className="likeUserfollowAvatarBox"
                  // onClick={() => [handleCloseFollowing()]}
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
                    <Button
                      className="likeUserFollowButton"
                      variant="contained"
                    >
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
