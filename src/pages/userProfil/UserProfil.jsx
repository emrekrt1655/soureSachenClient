import React from "react";
import SideBarLeft from "../../components/sidebarleft/SideBarLeft";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Posts from "../../components/posts/Posts";
import Topbar from "../../components/topbar/Topbar";

import "./userProfil.css";

const UserProfil = () => {
  const { userId } = useParams();
  const {
    userReducer,
    topicReducer,
    postReducer,
    likeReducer,
    followerReducer,
  } = useSelector((state) => state);
  const topicData = topicReducer?.data;
  const posts = postReducer?.data;
  const users = userReducer?.data;
  const likeData = likeReducer?.data;
  const followerData = followerReducer?.data;
  const profileOfUser = users?.find((u) => u?.userId === userId);

  const postData = posts?.filter(
    (p) => p?.postUserId === profileOfUser?.userId
  );

  return (
    <div>
      <Topbar />

      <div className="userProfilContainer">
        <SideBarLeft
          profileOfUser={profileOfUser}
          followerData={followerData}
        />
        <Posts topicData={topicData} postData={postData} likeData={likeData} />
      </div>
    </div>
  );
};

export default UserProfil;
