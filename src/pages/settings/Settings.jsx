import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./settings.css";
import { update, deleteAcccount } from "../../redux/actions/authAction";
import Alert from "../../components/alert/Alert";
import Topbar from "../../components/topbar/Topbar";

export default function Settings() {
  const dispatch = useDispatch();
  const { authReducer } = useSelector((state) => state);
  const user = authReducer?.user;
  const id = user?.userId;
  const access_token = authReducer?.access_token;

  const initialState = {
    avatar: user?.avatar,
    userName: user?.userName,
    email: user?.email,
    password: "",
    cf_password: "",
  };
  const [userUpdate, setUserUpdate] = useState(initialState);
  const { userName, email, password, cf_password, avatar } = userUpdate;
  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setUserUpdate({ ...userUpdate, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(update(userUpdate, id, access_token));
  };
  const handleDeleteAccount = () => {
    dispatch(deleteAcccount(id, access_token));
  };

  return (
    <>
      <Topbar />
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            {/* <span className="settingsTitleUpdate">Update Your Account</span> */}
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
            <img
              src={user?.avatar}
              alt={`${user?.userName}`}
              className="ppimg"
            />
            {/* <label htmlFor="avatar">Profile Picture</label> */}
            <input
              id="fileInput"
              type="text"
              name="avatar"
              value={avatar}
              onChange={handleChangeInput}
              className="settingsPPInput"
            />

            <label>Username</label>
            <input
              type="text"
              placeholder="New username"
              name="userName"
              value={userName}
              onChange={handleChangeInput}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder="new email"
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              placeholder="Please give your old or new Password to update your infos"
              name="password"
              value={password}
              onChange={handleChangeInput}
            />
            <label htmlFor="password">Password Confirm</label>
            <input
              type="password"
              placeholder="Please give your old Password"
              name="cf_password"
              value={cf_password}
              onChange={handleChangeInput}
            />
            <Alert />
            <button className="settingsSubmitButton" type="submit">
              Update
            </button>
          </form>
          <span className="settingsTitleDelete" onClick={handleDeleteAccount}>
            Delete Account
          </span>
        </div>
        {/* <Sidebar /> */}
      </div>
    </>
  );
}
