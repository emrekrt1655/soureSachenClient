import { useState } from "react";
import { useDispatch } from "react-redux";
import "./changePassword.scss";
import { changeOldPassword } from "../../redux/actions/authAction";
import Topbar from "../../components/topbar/Topbar";

export default function ChangePassword({ user, access_token }) {
  const dispatch = useDispatch();
  const id = user?.userId;

  const initialState = {
    userId: id,
    oldPassword: "",
    password: "",
    passwordConfirmation: "",
  };

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setChangePassword({ ...changePassword, [name]: value });
  };

  const [changePassword, setChangePassword] = useState(initialState);
  const { userId, oldPassword, password, passwordConfirmation } =
    changePassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeOldPassword(changePassword, id, access_token));
  };
  return (
    <>
      <Topbar user={user} access_token={access_token} />
      <div className="changePassword">
        <div className="changePassword__changePasswordWrapper">
          <form
            className="changePassword__changePasswordWrapper--changePasswordForm"
            onSubmit={handleSubmit}
          >
            <input
              className="userId"
              type="text"
              name="userId"
              value={userId}
              readOnly={true}
            />

            <label>Old Password</label>
            <input
              type="password"
              placeholder="Please Write your old Password"
              name="oldPassword"
              value={oldPassword}
              onChange={handleChangeInput}
            />
            <label>New Password</label>
            <input
              type="password"
              placeholder="New Password"
              name="password"
              value={password}
              onChange={handleChangeInput}
            />
            <label htmlFor="Password Confirmation">Password Confirmation</label>
            <input
              type="password"
              placeholder="Password Confirmation"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={handleChangeInput}
            />
            <button
              className="changePassword__changePasswordWrapper--changePasswordForm__changePasswordButton"
              type="submit"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
