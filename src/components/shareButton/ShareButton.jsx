import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FacebookIcon from "@mui/icons-material/Facebook";
// import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import "./shareButton.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 470,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 50,
};

const ShareButton = ({ openShareButton, closeShareButton, shareLink }) => {
  const shareLinkPost = window.location.origin + shareLink;
  const message = "This is an awesome article, just take 1 minute to read it";

  const whatsappApi = `https://wa.me/?text=${shareLinkPost} ${message}`;
  const telegramAip = `https://t.me/share/url?url=${shareLinkPost}&text=${message}`;
  const twitterApi = `https://twitter.com/intent/tweet?text=${shareLinkPost} ${message}`;
  const facebookApi = `https://www.facebook.com/sharer.php?u=${shareLinkPost} ${message}`;
  const pinteresApi = `https://pinterest.com/pin/create/bookmarklet/?media=&url=${shareLinkPost}&description=${message}`;
  const linkedInApi = `https://www.linkedin.com/shareArticle?url=${shareLinkPost}&title=${message}`;

  const shareLinkOfPost = (linkOfSocialMedia) => {
    window.open(linkOfSocialMedia, "blank");
  };

  return (
    <div>
      <Modal
        open={openShareButton}
        onClose={closeShareButton}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="textOfShareButtons"
          >
            Share your post
          </Typography>
          <Box className="shareButtonIcon">
            <FacebookIcon onClick={() => shareLinkOfPost(facebookApi)} />
            <PinterestIcon onClick={() => shareLinkOfPost(pinteresApi)} />
            <LinkedInIcon onClick={() => shareLinkOfPost(linkedInApi)} />
            <TwitterIcon onClick={() => shareLinkOfPost(twitterApi)} />
            <TelegramIcon onClick={() => shareLinkOfPost(telegramAip)} />
            <WhatsAppIcon onClick={() => shareLinkOfPost(whatsappApi)} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ShareButton;
