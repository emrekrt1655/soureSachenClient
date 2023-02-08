import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/actions/authAction";
import "./topbar.scss";

export default function Topbar({ user, access_token }) {
  const dispatch = useDispatch();

  return (
    <div className="top">
      <div className="topLeft">
        <Link className="link" to="/">
          <i className="topIcon fab fa-pied-piper-alt"></i>
        </Link>
      </div>
      <div className="topCenter">
        <div className="topList">
          <div className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </div>
          <div className="topListItem">ABOUT</div>
          <div className="topListItem">CONTACT</div>
          {!access_token ? (
            <div className="topbarLoginRegister">
              <div className="topListItem">
                <Link className="link" to="/login">
                  LOGIN
                </Link>
              </div>
              <div className="topListItem">
                <Link className="link" to="/register">
                  REGISTER
                </Link>
              </div>
            </div>
          ) : (
            <div></div>
          )}

          {access_token && (
            <Link
              className="link"
              to="/"
              onClick={() => dispatch(logOut(access_token))}
            >
              {" "}
              <li className="topListItem">LOGOUT</li>{" "}
            </Link>
          )}
        </div>
      </div>
      <div className="topRight">
        {access_token && (
          <Link className="link" to={`/${user?.userId}/userProfile`}>
            <img className="topImg" src={user?.avatar} alt="avatar" />
          </Link>
        )}
      </div>
    </div>
  );
}
