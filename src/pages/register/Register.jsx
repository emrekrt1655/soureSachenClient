import React, { useState } from "react";
import "./register.css";

export default function Register() {
  const initialState = {
    userName: "",
    email: "",
    password: "",
  };
  const [userRegister, setUserRegister] = useState(initialState);
  const { userName, email, password } = userRegister;
  const [typePass, setTypePass] = useState(false);
  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setUserRegister({
      ...userRegister,
      [name]: value,
    });
  };
  const handleTypePass = () => {
    setTypePass(!typePass);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="register">
      <div className="registerBorder">
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
          <small onClick={handleTypePass}> {typePass ? "Hide" : "Show"} </small>{" "}
          <button className="registerButton">Register</button>
        </form>
        <button className="registerLoginButton">Login</button>
      </div>
    </div>
  );
}
