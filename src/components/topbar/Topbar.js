import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../redux/actions/authAction";
import "./topbar.css";

export default function Topbar() {
  const { authReducer } = useSelector((state) => state);
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
          <div className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </div>

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
            <Link className="link" to="/" onClick={() => dispatch(logOut())}>
              {" "}
              <li className="topListItem">LOGOUT</li>{" "}
            </Link>
          )}
        </div>
      </div>
      <div className="topRight">
        <i className="topSearchIcon fas fa-search"></i>
        {authReducer?.user && (
          <Link className="link" to="/settings">
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
