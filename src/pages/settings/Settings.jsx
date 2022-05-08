import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./settings.css";
import { update, deleteAcccount } from "../../redux/actions/authAction";
import { getUsers } from "../../redux/actions/userAction";
import {useHistory} from "react-router-dom"
import Topbar from "../../components/topbar/Topbar";

export default function Settings() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { authReducer } = useSelector((state) => state);
  const user = authReducer?.user;
  const id = user?.userId;
  const access_token = authReducer?.access_token;

  const initialState = {
    avatar: user?.avatar,
    bio: user?.bio,
    name: user?.name,
    surname: user?.surname,
  };
  const [userUpdate, setUserUpdate] = useState(initialState);
  const { bio, name, surname, avatar } = userUpdate;
  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setUserUpdate({ ...userUpdate, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(update(userUpdate, id, access_token)).then(() => dispatch(getUsers()).then(() => history?.push("/") ) )
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

            <label>Name</label>
            <input
              type="text"
              placeholder="New name"
              name="name"
              value={name}
              onChange={handleChangeInput}
            />
            <label>Surname</label>
            <input
              type="text"
              placeholder="new Surname"
              name="surname"
              value={surname}
              onChange={handleChangeInput}
            />
            <label htmlFor="Bio">Bio</label>
            <input
              type="text"
              placeholder="New Bio"
              name="bio"
              value={bio}
              onChange={handleChangeInput}
            />
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
