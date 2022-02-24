import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";

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
            <Avatar
              alt="avatar foto"
              src="https://miro.medium.com/fit/c/176/176/1*3g1mneT-qpOmMWVSRarnVg.jpeg"
            />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Faris Kanbur
            </Typography>
          </Stack>
          <Input
            fullWidth
            id="fullWidth"
            style={{ marginTop: "19px" }}
            placeholder="Deine Topic"
          />

          <TextField
            style={{ marginTop: "19px" }}
            placeholder="Schreibe deine gedanken"
            fullWidth
            multiline
            rows={3}
            maxRows={4}
          />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            style={{ marginTop: "19px", float: "right" }}
          >
            Send
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
