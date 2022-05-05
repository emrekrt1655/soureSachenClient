import "./profilCard.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import FollowerList from "../followList/FollowerList";
import FollowingList from "../followList/FollowingList";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import AttractionsSharpIcon from "@mui/icons-material/AttractionsSharp";
import Tooltip from "@mui/material/Tooltip";

export default function ProfilCard({ profileOfUser, followerData }) {
  const user = useSelector((state) => state?.authReducer?.user);
  console.log(user);
  const access_token = useSelector((state) => state?.authReducer?.access_token);
  const users = useSelector((state) => state?.userReducer?.data);
  const [openFollower, setOpenFollower] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);
  const handleOpenFollower = () => {
    followers?.length > 0 && setOpenFollower(true);
  };
  const handleOpenFollowing = () => {
    followings?.length > 0 && setOpenFollowing(true);
  };
  const handleCloseFollower = () => setOpenFollower(false);
  const handleCloseFollowing = () => setOpenFollowing(false);

  const currentUser = profileOfUser
    ? profileOfUser
    : users?.find((u) => u.userId === user?.userId);

  const followers = followerData?.filter(
    (follower) => follower?.followedId === currentUser?.userId
  );

  const followings = followerData?.filter(
    (follower) => follower?.followerId === currentUser?.userId
  );

  return (
    <>
      <FollowerList
        followers={followers}
        handleCloseFollower={handleCloseFollower}
        openFollower={openFollower}
        users={users}
        access_token={access_token}
        followerData={followerData}
        user={user}
      />
      <FollowingList
        user={user}
        currentUser={currentUser}
        followings={followings}
        handleCloseFollowing={handleCloseFollowing}
        openFollowing={openFollowing}
        users={users}
        access_token={access_token}
        followerData={followerData}
      />
      <div>
        <div className="profile-card-4 text-center">
          <Link to={`/userProfile/${currentUser?.userId}`}>
            <img
              src={currentUser?.avatar}
              className="img img-responsive"
              alt="profilcard"
            />
          </Link>
          <div className="profile-content">
            <div className="profile-name">
              {`${currentUser?.name} ${currentUser?.surname}`}
              <p>@{currentUser?.userName}</p>
              {currentUser?.isVerified === "true" && (
                <Tooltip title="Verified User">
                  <FingerprintIcon />
                </Tooltip>
              )}
              {currentUser?.isTopicCreator === "true" && (
                <Tooltip title="Topic Creator">
                  <AttractionsSharpIcon />
                </Tooltip>
              )}
            </div>
            <div className="profile-description">
              <p>{currentUser?.bio}</p>
            </div>
            <div className="rowProfil">
              <div className="col-xs-4">
                <div className="profile-overview">
                  <p>OPINIONS</p>
                  <h4>{currentUser?._count?.posts}</h4>
                </div>
              </div>
              <div className="col-xs-4">
                <div className="profile-overview">
                  <p>FOLLOWERS</p>
                  <h4 onClick={handleOpenFollower}>{followers?.length}</h4>
                </div>
              </div>
              <div className="col-xs-4">
                <div className="profile-overview">
                  <p>FOLLOWING</p>
                  <h4 onClick={handleOpenFollowing}>{followings?.length}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
