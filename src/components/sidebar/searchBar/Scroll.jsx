import React from "react";

const Scroll = (props) => {
  return (
    <div
      style={{
        zIndex: 99,
        overflowY: "scroll",
        maxHeight: "100px",
        width: "300px",
      }}
    >
      {props.children}
    </div>
  );
};

export default Scroll;
