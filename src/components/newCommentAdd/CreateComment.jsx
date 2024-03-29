import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import { useSelector, useDispatch } from "react-redux";
import { createComment, getComments } from "../../redux/actions/commentAction";
import { getPosts } from "../../redux/actions/postAction";
import { typeText } from "../../redux/actions/alertAction";
import "../newPostAdd/newPostAdd.scss";

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

function CreateNewComment({ handleClose, access_token, open, post, authUser }) {
  const avatar = useSelector((state) => state?.authReducer?.user?.avatar);
  const authUserId = authUser?.userId;
  const name = authUser?.name;
  const surname = authUser?.surname;
  const dispatch = useDispatch();
  const commentPostId = post?.postId;

  const initialState = {
    text: "",
    commentUserId: authUser?.userId,
    commentPostId: commentPostId,
  };

  const [comment, setComment] = React.useState(initialState);
  const { text } = comment;
  const handleChangeInput = (e) => {
    setComment({
      commentUserId: authUserId,
      commentPostId: commentPostId,
      text: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length > 20) {
      dispatch(createComment(comment, access_token))
        .then(() => dispatch(getComments(commentPostId)))
        .then(() => dispatch(getPosts()))
        .then(() => {
          handleClose();
        });
    } else {
      dispatch(typeText("Enter a text of at least 20 characters"));
    }
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
            <Avatar alt="avatar" src={avatar} />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {name} {surname}
            </Typography>
          </Stack>
          <Input
            fullWidth
            id="text"
            name="text"
            style={{ marginTop: "19px", marginBottom: "10px" }}
            placeholder="Add your comment.."
            value={text}
            onChange={handleChangeInput}
          />

          <div className="buttonPartNewPost">
            <Button
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

export default CreateNewComment;
