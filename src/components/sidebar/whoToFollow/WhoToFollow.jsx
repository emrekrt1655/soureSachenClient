import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { follow, getFollowers } from "../../../redux/actions/followerAction";
import "./whoToFollow.scss";

export default function WoToFollow({followerData}) {
  const dispatch = useDispatch();
  const { authReducer, userReducer } = useSelector(
    (state) => state
  );
  const authUser = authReducer?.user?.userId;
  const access_token = authReducer?.access_token;
  const userList = userReducer?.data;

  let authFollowers = followerData
    ?.filter((user) => user?.followerId === authUser)
    ?.map(({ followedId }) => followedId);
  authFollowers?.push(authUser);

  let filteredList = [];

  userList?.forEach((follower) => {
    if (authFollowers?.indexOf(follower?.userId) === -1) {
      filteredList?.push(follower);
    }
  });

  const newSuggestionList = [];

  if (filteredList?.length <= 3) {
    newSuggestionList?.push(...filteredList);
  } else {
    while (true) {
      const ran =
        filteredList[Math.floor(Math.random() * filteredList?.length)];
      if (newSuggestionList.indexOf(ran) === -1) newSuggestionList.push(ran);
      if (newSuggestionList.length === 3) break;
    }
  }

  return (
    <div className="whotoFollowContainer">
      {newSuggestionList?.length > 0 && <p id="whotofollow">WHO TO FOLLOW</p>}
      <Stack direction="row" spacing={2}>
        {newSuggestionList?.map((p, index) => (
          <Box key={index} className="whotofollowavatar">
            <Link to={`/${p?.userId}/userProfile`}>
              <Avatar
                className="whotoFollowAvatar"
                alt={p?.name}
                src={p?.avatar}
              />
            </Link>
            <Typography variant="overline" display="block" gutterBottom>
              @{p?.userName}
            </Typography>
            <Button
              className="whotoFollowButton"
              variant="contained"
              onClick={() =>
                dispatch(
                  follow(
                    {
                      followerId: authUser,
                      followedId: p?.userId,
                    },
                    access_token
                  )
                )?.then(() => dispatch(getFollowers(access_token)))
              }
            >
              Follow
            </Button>
          </Box>
        ))}
      </Stack>
    </div>
  );
}
