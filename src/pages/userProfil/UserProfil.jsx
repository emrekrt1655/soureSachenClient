import React from "react";
import SideBarLeft from "../../components/sidebarleft/SideBarLeft";
import { useParams } from "react-router-dom";
import Posts from "../../components/posts/Posts";
import Topbar from "../../components/topbar/Topbar";

import "./userProfil.scss";

const UserProfil = ({ likeData, posts, topicData, users, followerData, access_token, authUser }) => {
  const { userId } = useParams();

  const profileOfUser = users?.find((u) => u?.userId === userId);

  const postData = posts?.filter(
    (p) => p?.postUserId === profileOfUser?.userId
  );

  return (
    <div>
      <Topbar access_token={access_token} user={authUser} />

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
