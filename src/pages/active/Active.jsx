import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { postAPI } from "../../utils/api";
import { showErrMsg, showSuccessMsg } from "../../components/alert/Alert";
import "./active.scss";

const Active = () => {
  const { slug } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (slug) {
      postAPI("active", { active_token: slug })
        .then((res) => setSuccess(res.data.message))
        .catch((err) =>
          setErr("Upps! Something happened. Please register again!")
        );
    }
  }, [slug]);

  const goLogin = () => {
    history.push("/login");
  };
  const goRegister = () => {
    history.push("/register");
  };

  return (
    <div>
      {err && showErrMsg(err)}
      {err && (
        <h4 className="loginLink">
          {" "}
          Go to the{" "}
          <span onClick={goRegister}>
            {" "}
            <pre> register page </pre>{" "}
          </span>{" "}
        </h4>
      )}
      {success && showSuccessMsg(success)}
      {success && (
        <h4 className="loginLink">
          {" "}
          Go to the{" "}
          <span onClick={goLogin}>
            {" "}
            <pre> login page </pre>{" "}
          </span>{" "}
        </h4>
      )}
    </div>
  );
};

export default Active;
