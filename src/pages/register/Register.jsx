import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { register } from "../../redux/actions/authAction";
import Alert from "../../components/alert/Alert";
import { Link } from "react-router-dom";

import "./register.css";

export default function Register() {
  const initialState = {
    userName: "",
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const [userRegister, setUserRegister] = useState(initialState);
  const { userName, email, password, cf_pass } = userRegister;
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);
  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setUserRegister({
      ...userRegister,
      [name]: value,
    });
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
        <form className="registerForm">
          <label htmlFor="userName">Username</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter your username..."
            id="userName"
            name="userName"
            value={userName}
            onChange={handleChangeInput}
          />
          <label>Email</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter your email..."
            id="email"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
          <label>Password</label>
          <input
            className="registerInput"
            type={typePass ? "text" : "password"}
            placeholder="Enter your password..."
            id="password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
          <small onClick={handleSubmit}> {typePass ? "Hide" : "Show"} </small>{" "}
          <button className="registerButton">Register</button>
        </form>
        <button className="registerLoginButton">Login</button>
      </div>
    </div>
  );
}
