import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/authAction";
import Alert from "../../components/alert/Alert";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import "./register.css";

export default function Register() {
  const initialState = {
    userName: "",
    email: "",
    password: "",
    cf_password: "",
  };
  const [userRegister, setUserRegister] = useState(initialState);
  const { userName, email, password, cf_password } = userRegister;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userRegister));
  };

  return (
    <div className="register">
      <div className="registerBorder">
        <Link className="link" to="/">
          <i className="topIcon fab fa-pied-piper-alt"></i>
        </Link>
        <span className="registerTitle">Register</span>
        <div className="registerBorderDown">
          <form className="registerForm" onSubmit={handleSubmit}>
            <label htmlFor="userName" className="form-label">
              Username
            </label>
            <input
              className="registerInput"
              type="text"
              placeholder="Enter your username..."
              id="userName"
              name="userName"
              value={userName}
              onChange={handleChangeInput}
            />
            <label className="form-label">Email</label>
            <input
              className="registerInput"
              type="text"
              placeholder="Enter your email..."
              id="email"
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div>
              <input
                type={typePass ? "text" : "password"}
                className="registerInput"
                id="password"
                name="password"
                value={password}
                onChange={handleChangeInput}
                placeholder="Password must be at least 6 chars."
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
                className="registerInput"
                id="cf_password"
                name="cf_password"
                value={cf_password}
                onChange={handleChangeInput}
                placeholder="Your confirm password."
              />
              <small
                onClick={() => setTypeCfPass(!typeCfPass)}
                className="eyesOnPassword"
              >
                {!typeCfPass ? <VisibilityOffIcon /> : <VisibilityIcon />}{" "}
              </small>
            </div>
            <button className="registerButton" type="submit">
              Register
            </button>
            <p className="loginTextAcount">
              Already have an account?
              <Link to="/login" className="registerLoginButton">
                <a>Login</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
