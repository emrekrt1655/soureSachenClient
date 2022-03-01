import { Link } from "react-router-dom";
import "./topbar.css";

export default function Topbar() {
  const user = false;
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-pied-piper-alt"></i>
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

          {!user ? (
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

          {user && <li className="topListItem">LOGOUT</li>}
        </div>
      </div>
      <div className="topRight">
        <i className="topSearchIcon fas fa-search"></i>
        {user && (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src="https://miro.medium.com/fit/c/176/176/1*3g1mneT-qpOmMWVSRarnVg.jpeg"
              alt=""
            />
          </Link>
        )}
      </div>
    </div>
  );
}
