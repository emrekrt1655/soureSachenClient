import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./whoToFollow.css";

export default function WoToFollow() {
  return (
    <Stack direction="row" spacing={2}>
      <Box className="whotofollowavatar">
        <Avatar
          className="whotoFollowAvatar"
          alt="Remy Sharp"
          src="https://media-exp1.licdn.com/dms/image/C4E03AQHw-oMgJsCQlQ/profile-displayphoto-shrink_800_800/0/1638547777763?e=1651708800&v=beta&t=YP5nJx597bKA4K-bOMKhoXR9rJKhf3s2Vt_ja5mRAak"
        />
        <Typography variant="overline" display="block" gutterBottom>
          Mustafa Genc
        </Typography>
        <Button className="whotoFollowButton" variant="contained">
          Follow
        </Button>
      </Box>
      <Box className="whotofollowavatar">
        <Avatar
          className="whotoFollowAvatar"
          alt="Travis Howard"
          src="https://media-exp1.licdn.com/dms/image/C4D03AQHXSZD9i1RCCA/profile-displayphoto-shrink_800_800/0/1602258169236?e=1651708800&v=beta&t=3k6p7gTjTL6LSIi2_qkLsTHBGrD_yMPCkJ22lY2YjrU"
        />
        <Typography variant="overline" display="block" gutterBottom>
          Emre Kurt
        </Typography>
        <Button className="whotoFollowButton" variant="contained">
          Follow
        </Button>
      </Box>
      <Box className="whotofollowavatar">
        <Avatar
          className="whotoFollowAvatar"
          alt="Cindy Baker"
          src="https://miro.medium.com/fit/c/1360/1360/1*3g1mneT-qpOmMWVSRarnVg.jpeg"
        />
        <Typography variant="overline" display="block" gutterBottom>
          Faris Kanbur
        </Typography>
        <Button className="whotoFollowButton" variant="contained">
          Follow
        </Button>
      </Box>
    </Stack>
  );
}
