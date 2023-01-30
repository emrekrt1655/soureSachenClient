import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./login.scss";
import { login } from "../../redux/actions/authAction";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const [userLogin, setUserLogin] = useState(initialState);
  const { email, password } = userLogin;
  const [typePass, setTypePass] = useState(false);
  const { authReducer } = useSelector((state) => state);

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };
  const handleTypePass = () => {
    setTypePass(!typePass);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userLogin));
    navigate("/")
  };

  // useEffect(async () => {
  //   if (authReducer?.access_token) navigate("/");
  // }, [authReducer?.access_token, navigate]);
  return (
    <div className="login">
      <div className="login__loginBorder">
        <Link className="login__loginBorder--link" to="/">
          <i className="topIcon fab fa-pied-piper-alt"></i>
        </Link>
        <span className="login__loginBorder--loginTitle">Login</span>
        <div className="login__loginBorder--loginBorderDown">
          <form className="loginForm" onSubmit={handleSubmit}>
            <label htmlFor="email" className="loginForm__LoginText">
              Email
            </label>
            <input
              className="loginForm__loginInput"
              type="text"
              placeholder="Enter your email..."
              id="email"
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
            <label htmlFor="password" className="loginForm__LoginText">
              Password
            </label>
            <div>
              <input
                className="loginForm__loginInput"
                type={typePass ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={handleChangeInput}
                placeholder="Enter your password..."
              />
              <small
                onClick={handleTypePass}
                className="loginForm__eyesOnPassword"
              >
                {!typePass ? <VisibilityOffIcon /> : <VisibilityIcon />}{" "}
              </small>
            </div>
            <button
              className="loginForm__loginButton"
              type="submit"
              disabled={email && password ? false : true}
            >
              Login
            </button>
            <p className="loginForm__registerTextAcount">
              Don't you have an account?
              <Link
                className="loginForm__registerTextAcount--loginRegisterButton"
                to="/register"
              >
                Register
              </Link>
            </p>
            <p className="loginForm__registerTextAcount">
              Did you
              <Link
                className="loginForm__registerTextAcount--loginRegisterButton"
                to="/forgot/password"
              >
                forget your password?
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
