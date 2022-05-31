import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  TwitterShareButton,
  WhatsappShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  // EmailShareButton,
  // InstapaperShareButton,
  // PinterestShareButton,
  // PocketShareButton,
  // TelegramShareButton,
  // TumblrShareButton,
} from "react-share";

import {
  TwitterIcon,
  WhatsappIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  // EmailIcon,
  // FacebookMessengerIcon,
  // InstapaperIcon,
  // PinterestIcon,
  // PocketIcon,
  // TelegramIcon,
  // TumblrIcon,
} from "react-share";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ShareButton = ({ openShareButton, closeShareButton, shareLink }) => {
  const shareLinkPost = window.location.origin + shareLink;

  return (
    <Modal
      open={openShareButton}
      onClose={closeShareButton}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Share your post
        </Typography>

        <FacebookShareButton className="aris" url={shareLinkPost}>
          <FacebookIcon logFillColor="white" round={true}></FacebookIcon>
        </FacebookShareButton>

        <WhatsappShareButton url={shareLinkPost}>
          <WhatsappIcon logFillColor="white" round={true}></WhatsappIcon>
        </WhatsappShareButton>

        <RedditShareButton url={shareLinkPost}>
          <RedditIcon logFillColor="white" round={true}></RedditIcon>
        </RedditShareButton>

        <LinkedinShareButton url={shareLinkPost}>
          <LinkedinIcon logFillColor="white" round={true}></LinkedinIcon>
        </LinkedinShareButton>

        <TwitterShareButton url={shareLinkPost}>
          <TwitterIcon logFillColor="white" round={true}></TwitterIcon>
        </TwitterShareButton>
      </Box>
    </Modal>
  );
};

export default ShareButton;
