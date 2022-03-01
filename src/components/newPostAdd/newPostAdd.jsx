import * as React from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CameraIcon from "@mui/icons-material/Camera";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";

function NewPostAdd() {
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        height: "170px",
        width: "698px",
        background: "#fffbfb",
        borderRadius: "10px",
        justifyContent: "space-around",
        margin: "10px auto",
      }}
    >
      <CardContent
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "7px",
        }}
      >
        <Stack>
          <Avatar
            alt="Remy Sharp"
            src="https://miro.medium.com/fit/c/1360/1360/1*3g1mneT-qpOmMWVSRarnVg.jpeg"
            sx={{ width: 56, height: 56 }}
          />
        </Stack>

        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginLeft: "20px",
          }}
        >
          <TextField
            fullWidth
            label="Beitrag schreiben"
            id="fullWidth"
            disabled
          />
        </Box>
      </CardContent>
      <CardActions
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <IconButton aria-label="add Foto">
          <CameraIcon />
          <span style={{ marginLeft: "7px" }}>Foto</span>
        </IconButton>

        <IconButton aria-label="Schreiben">
          <DriveFileRenameOutlineOutlinedIcon />
          <span style={{ marginLeft: "7px" }}> Schreiben</span>
        </IconButton>

        <IconButton aria-label="share">
          <ShareIcon />
          <span style={{ marginLeft: "7px" }}> Teilen</span>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default NewPostAdd;
