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
import { useSelector, useDispatch } from "react-redux";
import { createPost, getPosts } from "../../redux/actions/postAction";
import { getTopics } from "../../redux/actions/topicAction";
import { typeText } from "../../redux/actions/alertAction";
import "./newPostAdd.css";

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

function NewPostAdd({ topicId, posts, handleClose, open }) {
  const userId = useSelector((state) => state?.authReducer?.user?.userId);
  const avatar = useSelector((state) => state?.authReducer?.user?.avatar);
  const name = useSelector((state) => state?.authReducer?.user?.name);
  const surname = useSelector((state) => state?.authReducer?.user?.surname);
  const topics = useSelector((state) => state?.topicReducer?.data);
  const access_token = useSelector((state) => state?.authReducer?.access_token);
  const dispatch = useDispatch();
  const [imgInput, setImgInput] = React.useState(false);

  const initialState = {
    text: "",
    postUserId: userId,
    postTopicId: topicId,
    image: "",
  };

  const [post, setPost] = React.useState(initialState);
  const { text, image } = post;

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const showImgInput = () => {
    setImgInput(!imgInput);
  };

  const topic = topics?.find((topic) => topic?.topicId === topicId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length > 40) {
      dispatch(createPost(post, access_token)).then(() => {
        handleClose();
      });
    } else {
      dispatch(typeText("Enter a text of at least 40 characters"));
    }
  };

  React.useEffect(() => {
    dispatch(getPosts());
  }, [posts?.length]);

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
            <Avatar alt="avatar" src={avatar} />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {name} {surname}
            </Typography>
          </Stack>
          <h4 className="topicTextofNewPost">
            {" "}
            {topic?.text.length < 50
              ? topic?.text
              : topic?.text?.slice(0, 50) + "..."}{" "}
          </h4>
          <Input
            fullWidth
            id="text"
            name="text"
            style={{ marginTop: "19px", marginBottom: "10px" }}
            placeholder="Add your opinion.."
            value={text}
            onChange={handleChangeInput}
          />
          <div className={!imgInput && "hideImg"}>
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
          <div className="buttonPartNewPost">
            <Button
              // disabled={text.length > 40 ? false : true}
              variant="contained"
              endIcon={<SendIcon />}
              style={{
                marginTop: "19px",
                float: "right",
              }}
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

export default NewPostAdd;
