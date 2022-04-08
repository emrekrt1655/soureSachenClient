import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./likeUsers.css";

const style = {
  position: "absolute",
  top: "30%",
  left: "70%",
  transform: "translate(-50%, -50%)",
  width: 325,
  height: 325,
  bgcolor: "background.paper",
  borderRadius: "3%",
  border: "1px solid #195d49",
  boxShadow: 24,
  p: 8,
  overflow: "scroll",
  display: "flex",
  flexDirection: "column",
};

export default function LikeUsers({ open, handleClose, likes, users }) {
  let likeUsers = [];

  likes?.map((like) => {
    let userLike = users?.find((user) => user.userId === like?.likeUserId);
    if (userLike !== undefined) likeUsers.push(userLike);
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className=""></div>
        <ul className="">
          {likes &&
            likeUsers?.map((user, index) => (
              <li className="" key={index} onClick={() => [handleClose()]}>
                {" "}
                {user.name} {user.surname}
              </li>
            ))}
        </ul>
      </Box>
    </Modal>
  );
}
