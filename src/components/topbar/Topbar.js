import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../redux/actions/authAction";
import "./topbar.scss";

export default function Topbar() {
  const { authReducer } = useSelector((state) => state);
  const user = authReducer?.user;
  const dispatch = useDispatch();
  const token = authReducer?.access_token;

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
          {!authReducer?.access_token ? (
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

          {authReducer?.access_token && (
            <Link
              className="link"
              to="/"
              onClick={() => dispatch(logOut(token))}
            >
              {" "}
              <li className="topListItem">LOGOUT</li>{" "}
            </Link>
          )}
        </div>
      </div>
      <div className="topRight">
        {authReducer?.access_token && (
          <Link className="link" to={`/userProfile/${user?.userId}`}>
            <img
              className="topImg"
              src={authReducer?.user?.avatar}
              alt="avatar"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
