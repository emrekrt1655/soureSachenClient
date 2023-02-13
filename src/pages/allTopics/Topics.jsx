import * as React from "react";
import List from "@mui/material/List";

import Topbar from "../../components/topbar/Topbar";
import Topic from "./Topic";

export default function Topics({
  posts,
  users,
  topics,
  authUser,
  access_token,
}) {
  return (
    <>
      <Topbar user={authUser} access_token={access_token} />
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {topics &&
          topics.map((topic) => (
            <Topic
              key={topic?.topicId}
              posts={posts}
              users={users}
              topic={topic}
            />
          ))}
      </List>
    </>
  );
}
