import React, {useEffect} from "react";
import SideBarLeft from "../../components/sidebarleft/SideBarLeft";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Posts from "../../components/posts/Posts";
import Topbar from "../../components/topbar/Topbar";

import "./userProfil.scss";

const UserProfil = () => {
  const { userId } = useParams();
  const {
    userReducer,
    topicReducer,
    postReducer,
    likeReducer,
    followerReducer,
    socket
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


  useEffect(() => {
    if(!userId || !socket) return;
    socket?.emit('joinRoom', userId)

    return () => {
      socket?.emit('outRoom', userId)
    }
  },[socket, userId])

  return (
    <div>
      <Topbar />

      <div className="userProfilContainer">
        <SideBarLeft
          profileOfUser={profileOfUser}
          followerData={followerData}
        />
        {postData?.length > 0 ? (
          <Posts
            topicData={topicData}
            postData={postData}
            likeData={likeData}
          />
        ) : (
          <h2>There is no Opinions for this User</h2>
        )}
      </div>
    </div>
  );
};

export default UserProfil;
