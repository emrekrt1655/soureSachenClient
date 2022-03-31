import React from "react";
import { FollowedList } from "./followedList/FollowedList";
import ProfilCard from "./profilCard/ProfilCard";
import "./sidebarLeft.css";

export default function SideBarLeft() {
  //const [open, setOpen] = React.useState(false);
 // const handleOpen = () => setOpen(true);
  //const handleClose = () => setOpen(false);

  return (
    <div className="sidebarLeft">
      <ProfilCard />
      <div className="sidebarLeftItem">
        <span className="sidebarLeftTitle">WHO ARE FOLLOWED</span>
        <div className="sidebarLeftList">
          <FollowedList />
        </div>
      </div>
    </div>
  );
}
