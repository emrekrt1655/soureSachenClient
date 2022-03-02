import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

export const FollowedList = () => {
  return (
    <div>
      <AvatarGroup max={4}>
        <Avatar
          alt="Remy Sharp"
          src="https://media-exp1.licdn.com/dms/image/C4E03AQHw-oMgJsCQlQ/profile-displayphoto-shrink_800_800/0/1638547777763?e=1651708800&v=beta&t=YP5nJx597bKA4K-bOMKhoXR9rJKhf3s2Vt_ja5mRAak"
        />
        <Avatar
          alt="Travis Howard"
          src="https://media-exp1.licdn.com/dms/image/C4D03AQHXSZD9i1RCCA/profile-displayphoto-shrink_800_800/0/1602258169236?e=1651708800&v=beta&t=3k6p7gTjTL6LSIi2_qkLsTHBGrD_yMPCkJ22lY2YjrU"
        />
        <Avatar
          alt="Cindy Baker"
          src="https://miro.medium.com/fit/c/1360/1360/1*3g1mneT-qpOmMWVSRarnVg.jpeg"
        />
        <Avatar
          alt="Agnes Walker"
          src="https://www.linkedin.com/in/mustafa-gen%C3%A7-18606b134/overlay/photo/"
        />
        <Avatar
          alt="Trevor Henderson"
          src="https://media-exp1.licdn.com/dms/image/C4D03AQHXSZD9i1RCCA/profile-displayphoto-shrink_800_800/0/1602258169236?e=1651708800&v=beta&t=3k6p7gTjTL6LSIi2_qkLsTHBGrD_yMPCkJ22lY2YjrU"
        />
      </AvatarGroup>
    </div>
  );
};
