import { useState } from "react";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/SideBar";
import "./homepage.scss";
import SideBarLeft from "../../components/sidebarleft/SideBarLeft";
import Topbar from "../../components/topbar/Topbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function Homepage({
  postData,
  user,
  topicData,
  likeData,
  followerData,
  access_token,
}) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const followings = followerData?.filter(
    (follower) => follower?.followerId === user.userId
  );

  const followingsID = [];
  const filteredListforInterested = [];

  followings?.forEach((following) => {
    followingsID.push(following?.followedId);
  });

  postData?.forEach((post) => {
    if (followingsID?.indexOf(post?.postUserId) !== -1) {
      filteredListforInterested?.push(post);
    }
  });

  return (
    <>
      <Topbar access_token={access_token} user={user} />
      <div className="home">
        {user && <SideBarLeft followerData={followerData} />}
        <div className="home__homePage">
          <Tabs
            className="home__homePage--homePageTaps"
            value={value}
            onChange={handleChange}
            aria-label="icon label tabs example"
          >
            {user ? <Tab label="All" className="homePageTab" /> : ""}
            {user ? <Tab label="TIMELINE" className="homePageTab" /> : ""}
          </Tabs>
          <Posts
            topicData={topicData}
            postData={value === 0 ? postData : filteredListforInterested}
            likeData={likeData}
            authUser={user}
          />
        </div>
        <Sidebar
          user={user}
          access_token={access_token}
          postData={value === 0 ? postData : filteredListforInterested}
          topicData={topicData}
          likeData={likeData}
        />
      </div>
    </>
  );
}
