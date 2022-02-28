import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { register } from "../../redux/actions/authAction";
import Alert from "../../components/alert/Alert";
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
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
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
                <label htmlFor="password">Password</label>

        <input type={typePass ? "text" : "password"} 
          className="registerInput" 
          id="password"
          name="password" value={password} 
          onChange={handleChangeInput} 
          placeholder="Password must be at least 8 chars."
          />

          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? 'Hide' : 'Show'}
          </small>
          <label htmlFor="password" >
          Confirm Password
        </label>
        <input type={typeCfPass ? "text" : "password"} 
          className="registerInput" 
          id="cf_pass"  
          name="cf_pass" value={cf_pass} 
          onChange={handleChangeInput} 
          placeholder="Your confirm password."
          />

          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? 'Hide' : 'Show'}
          </small>
        <Alert />
        <button
          className="registerButton"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}
