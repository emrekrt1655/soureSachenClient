import React, { useState } from "react";
import "./login.css";

export default function Login() {
  const initialState = {
    email: "",
    password: "",
  };

  const [userLogin, setUserLogin] = useState(initialState);
  const { email, password } = userLogin;
  const [typePass, setTypePass] = useState(false);
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
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm">
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
        <small onClick={handleTypePass}> {typePass ? "Hide" : "Show"} </small>{" "}
        <button className="loginButton">Login</button>
      </form>
      <button className="loginRegisterButton">Register</button>
    </div>
  );
}
