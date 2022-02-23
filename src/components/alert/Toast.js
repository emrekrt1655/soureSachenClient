import React from "react";
import { useDispatch } from "react-redux";
import { ALERT } from "../../redux/types/types";
import "./toast.css"

const Toast = ({ body, title }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({ type: ALERT, payload: {} });
  };

  return (
    <div className="toastt">
      {title ? (
        typeof body === "string" ? (
          <span id="error"> {body} </span>
        ) : (
          <ul id="error">
            {body?.map((text, index) => (
              <li key={index}> {text} </li>
            ))}
          </ul>
        )
      ) : typeof body === "string" ? (
        <span id="success"> {body} </span>
      ) : (
        <ul id="success">
          {body?.map((text, index) => (
            <li key={index}> {text} </li>
          ))}
        </ul>
      )}

      <span onClick={handleClose} id="button">
        x
      </span>
    </div>
  );
};

export default Toast;
