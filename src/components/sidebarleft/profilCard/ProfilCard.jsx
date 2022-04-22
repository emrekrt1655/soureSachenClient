import "./profilCard.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import FollowerList from "../followList/FollowerList";
import FollowingList from "../followList/FollowingList";

export default function ProfilCard({ profileOfUser, followerData }) {
  const user = useSelector((state) => state?.authReducer?.user);
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
      />
      <div>
        <div className="profile-card-4 text-center">
          <img
            src={currentUser?.avatar}
            className="img img-responsive"
            alt="profilcard"
          />
          <div className="profile-content">
            <div className="profile-name">
              {`${currentUser?.name} ${currentUser?.surname}`}
              <p>{currentUser?.email}</p>
            </div>
            <div className="profile-description">
              <p style={{ color: "blue" }}>{currentUser?.bio}</p>
            </div>
            <div className="rowProfil">
              <div className="col-xs-4">
                <div className="profile-overview">
                  <p>TWEETS</p>
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
