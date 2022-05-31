import React, { useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/actions/authAction";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./resetPassword.scss";

const ResetPassword = () => {
  const token = useParams().slug;
  const dispatch = useDispatch();
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [cf_password, setCfPassword] = useState("");
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(resetPassword(password, cf_password, token));
    if (password === cf_password) history.push("/login");
  };

  return (
    <div className="resetPassword">
      <div className="resetPassword__border">
        <h3 className="resetPassword__border--title">Reset Password</h3>
        <div className="resetPassword__border--down">
          <form
            className="resetPassword__border--down__resetPasswordForm"
            onSubmit={handleSubmit}
          >
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div>
              <input
                type={typePass ? "text" : "password"}
                className="resetPasswordInput"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <small
                onClick={() => setTypePass(!typePass)}
                className="eyesOnPassword"
              >
                {!typeCfPass ? <VisibilityOffIcon /> : <VisibilityIcon />}{" "}
              </small>
            </div>

            <label htmlFor="password" className="form-label">
              Confirm Password
            </label>
            <div>
              <input
                type={typeCfPass ? "text" : "password"}
                className="resetPasswordInput"
                id="password"
                name="password"
                value={cf_password}
                onChange={(e) => setCfPassword(e.target.value)}
              />
              <small
                onClick={() => setTypeCfPass(!typeCfPass)}
                className="eyesOnPassword"
              >
                {!typeCfPass ? <VisibilityOffIcon /> : <VisibilityIcon />}{" "}
              </small>
            </div>

            <button type="submit" className="resetPasswordButton">
              Reset Password
            </button>
            <p className="ResetloginTextAcount">
              Do you remember your password?
              <Link to="/login" className="ResetloginTextAcount__LoginButton">
                <a>Login</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
