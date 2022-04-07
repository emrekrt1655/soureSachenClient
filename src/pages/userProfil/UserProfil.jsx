import React from "react";
import SideBarLeft from "../../components/sidebarleft/SideBarLeft";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Posts from "../../components/posts/Posts";
import "./userProfil.css";

const UserProfil = () => {
  const { userId } = useParams();
  const { userReducer, topicReducer, postReducer } = useSelector(
    (state) => state
  );
  const topicData = topicReducer?.data;
  const posts = postReducer?.data;
  const users = userReducer?.data;
  const profileOfUser = users?.find((u) => u?.userId === userId);

  const postData = posts?.filter(
    (p) => p?.postUserId === profileOfUser?.userId
  );

  return (
    <div className="userProfilContainer">
      <SideBarLeft profileOfUser={profileOfUser} />
      <Posts topicData={topicData} postData={postData} />
    </div>
  );
};

export default UserProfil;
