import React from "react";
import { SpinnerRoundOutlined } from "spinners-react";
import "./loading.css"

const Loading = () => {
  return (
    <div className="position-fixed w-100 h-100 text-center loading">
      <span> <SpinnerRoundOutlined size={50} thickness={100} speed={100} color="#36ad47" /></span>
    </div>
  );
};

export default Loading;
