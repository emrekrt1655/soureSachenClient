import React from "react";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import "./whoToFollow.css";

export default function WoToFollow() {
  const [suggestionList, setSuggestionList] = useState();
  const { authReducer, userReducer } = useSelector((state) => state);
  const authUser = authReducer?.user?.userId;
  const userList = userReducer?.data;

  useEffect(() => {
    if (authUser && userList) {
      setSuggestionList(() => {
        const filteredList = userList?.filter(
          (user) => user?.userId !== authUser
        );

        const newSuggestionList = [];

        while (newSuggestionList.length < 3) {
          const ran =
            filteredList[Math.floor(Math.random() * filteredList?.length)];
          if (newSuggestionList.indexOf(ran) === -1)
            newSuggestionList.push(ran);
          console.log("ran =>> ", ran);
        }

        return newSuggestionList;
      });
    }
  }, [userList, authUser]);

  return (
    <Stack direction="row" spacing={2}>
      {suggestionList?.map((p) => (
        <Box className="whotofollowavatar">
          <Avatar className="whotoFollowAvatar" alt={p?.name} src={p?.avatar} />
          <Typography variant="overline" display="block" gutterBottom>
            {p?.name + p?.surname}
          </Typography>
          <Button className="whotoFollowButton" variant="contained">
            Follow
          </Button>
        </Box>
      ))}
    </Stack>
  );
}
