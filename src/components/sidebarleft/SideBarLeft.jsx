import React from "react";
import { Link } from "react-router-dom";
import { FollowedList } from "./followedList/FollowedList";
import ProfilCard from "./profilCard/ProfilCard";
import LikedPosts from "./profilCard/ProfilCard";
import "./sidebarLeft.css";

export default function SideBarLeft() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="sidebarLeft">
      <ProfilCard />
      <div className="sidebarItem">
        <span className="sidebarTitle">WHO ARE FOLLOWED</span>
        <div className="sidebarList">
          <FollowedList />
        </div>
      </div>
    </div>
  );
}
