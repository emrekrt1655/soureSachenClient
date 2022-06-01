import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Modal from "@mui/material/Modal";
import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
// import Alert from "../alert/Alert";
import "./modal.scss";
import CountrySelect from "./CountryBox";
import { useDispatch, useSelector } from "react-redux";
import { createTopic, getTopics } from "../../redux/actions/topicAction";
import { typeText } from "../../redux/actions/alertAction";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 425,
  bgcolor: "background.paper",
  borderRadius: "3%",
  border: "1px solid #195d49",
  boxShadow: 24,
  p: 8,
};

export default function BasicModal({ open, handleClose }) {
  const access_token = useSelector((state) => state?.authReducer?.access_token);
  const currentUser = useSelector((state) => state?.authReducer?.user);
  const initialState = {
    text: "",
    image:
      "https://images.pexels.com/photos/1571673/pexels-photo-1571673.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    topicUserId: currentUser?.userId,
  };
  const [country, setCountryName] = React.useState("Worldwide");

  const dispatch = useDispatch();
  const [imgInput, setImgInput] = React.useState(false);
  const [topic, setTopic] = React.useState(initialState);
  const { text, image, topicUserId } = topic;

  const topicData = {
    text: text,
    image: image,
    topicUserId: topicUserId,
    country: country,
  };

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setTopic({
      ...topic,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length) {
      dispatch(createTopic(topicData, access_token)).then(() => {
        dispatch(getTopics());
      });
      handleClose();
    } else {
      dispatch(typeText("Topic cannot be left empty"));
    }
  };

  const showImgInput = () => {
    setImgInput(!imgInput);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction="row" spacing={2}>
            <Avatar alt="avatar" src={currentUser?.avatar} />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {currentUser?.name} {currentUser?.surname}
            </Typography>
          </Stack>
          <Input
            fullWidth
            id="text"
            name="text"
            style={{ marginTop: "19px", marginBottom: "10px" }}
            placeholder="Add new Topic"
            value={text}
            onChange={handleChangeInput}
          />
          <div className={!imgInput && "hide"}>
            <Input
              fullWidth
              id="image"
              name="image"
              style={{ marginTop: "19px" }}
              placeholder="Copy the Img url"
              value={image}
              onChange={handleChangeInput}
            />
          </div>
          <AddAPhotoIcon onClick={showImgInput} />
          <div className="buttonPart">
            <CountrySelect country={country} setCountryName={setCountryName} />

            <Button
              variant="contained"
              endIcon={<SendIcon />}
              style={{ marginTop: "19px", float: "right" }}
              onClick={handleSubmit}
            >
              Add
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
