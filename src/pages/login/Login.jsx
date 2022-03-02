import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./login.css";
import { login } from "../../redux/actions/authAction";
import Alert from "../../components/alert/Alert";
import { Link } from "react-router-dom";

export default function Login() {
  const history = useHistory();
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
  };

  useEffect(() => {
    if (authReducer?.access_token) history.push("/");
  }, [authReducer?.access_token, history]);
  return (
    <div className="login">
      <div className="loginBorder">
        <Link className="link" to="/">
          <i className="topIcon fab fa-pied-piper-alt"></i>
        </Link>
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            className="loginInput"
            type="text"
            placeholder="Enter your email..."
            id="email"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
          <label htmlFor="password">Password</label>
          <input
            className="loginInput"
            type={typePass ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={handleChangeInput}
            placeholder="Enter your password..."
          />
          <small onClick={handleTypePass}> {typePass ? "Hide" : "Show"} </small>
          <Alert />
          <button
            className="loginButton"
            type="submit"
            disabled={email && password ? false : true}
          >
            Login
          </button>
        </form>

        <button className="loginRegisterButton">Register</button>
      </div>
    </div>
  );
}
