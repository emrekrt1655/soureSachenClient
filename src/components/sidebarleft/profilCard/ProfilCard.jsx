import "./profilCard.css";
import { useSelector } from "react-redux";

export default function ProfilCard({ profileOfUser, followerData }) {
  const user = useSelector((state) => state?.authReducer?.user);
  const users = useSelector((state) => state?.userReducer?.data);

  const currentUser = profileOfUser
    ? profileOfUser
    : users?.find((u) => u.userId === user.userId);

  const followers = followerData?.filter(
    (follower) => follower?.followedId === currentUser.userId
  );
  const followings = followerData?.filter(
    (follower) => follower?.followerId === currentUser.userId
  );

  return (
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
                <h4>{followers?.length}</h4>
              </div>
            </div>
            <div className="col-xs-4">
              <div className="profile-overview">
                <p>FOLLOWING</p>
                <h4>{followings?.length}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
