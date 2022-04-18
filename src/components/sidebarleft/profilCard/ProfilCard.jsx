import "./profilCard.css";
import { useSelector } from "react-redux";

export default function ProfilCard({ profileOfUser }) {
  const user = useSelector((state) => state?.authReducer?.user);
  const users = useSelector((state) => state?.userReducer?.data);

  const currentUser = profileOfUser
    ? profileOfUser
    : users?.find((u) => u.userId === user.userId);

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
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor.
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
                <h4>{currentUser?._count?.followers}</h4>
              </div>
            </div>
            <div className="col-xs-4">
              <div className="profile-overview">
                <p>FOLLOWING</p>
                <h4>{currentUser?._count?.followings}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
