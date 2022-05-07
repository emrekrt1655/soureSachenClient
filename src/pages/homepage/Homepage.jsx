import { useState } from "react";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/SideBar";
import { useSelector } from "react-redux";
import "./homepage.css";
import SideBarLeft from "../../components/sidebarleft/SideBarLeft";
import Topbar from "../../components/topbar/Topbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function Homepage() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    authReducer,
    postReducer,
    topicReducer,
    likeReducer,
    followerReducer,
  } = useSelector((state) => state);
  const postData = postReducer?.data;
  const topicData = topicReducer?.data;
  const likeData = likeReducer?.data;
  const user = authReducer?.user;
  const access_token = authReducer?.access_token;
  const followerData = followerReducer?.data;

  const followings = followerData?.filter(
    (follower) => follower?.followerId === user.userId
  );

  const followingsID = [];
  const filteredListforInterested = [];

  followings?.forEach((following) => {
    followingsID.push(following?.followedId);
  });

  console.log(followingsID);

  postData?.forEach((post) => {
    if (followingsID?.indexOf(post?.postUserId) !== -1) {
      filteredListforInterested?.push(post);
    }
  });

  console.log(filteredListforInterested);

  return (
    <>
      <Topbar />
      <div className="home">
        {user && <SideBarLeft followerData={followerData} />}
        <div className="homePage">
          <Tabs
            className="homePageTaps"
            value={value}
            onChange={handleChange}
            aria-label="icon label tabs example"
          >
            <Tab label="All" className="homePageTap" />
            <Tab label="TIMELINE" className="homePageTap" />
          </Tabs>
          <Posts
            topicData={topicData}
            postData={value === 0 ? postData : filteredListforInterested}
            likeData={likeData}
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
