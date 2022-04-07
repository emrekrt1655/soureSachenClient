import React from "react";
import { FollowedList } from "./followedList/FollowedList";
import ProfilCard from "./profilCard/ProfilCard";
import "./sidebarLeft.css";

export default function SideBarLeft({ profileOfUser }) {
  return (
    <div className="sidebarLeft">
      <ProfilCard profileOfUser={profileOfUser} />
      <div className="sidebarLeftItem">
        <span className="sidebarLeftTitle">WHO ARE FOLLOWED</span>
        <div className="sidebarLeftList">
          <FollowedList />
        </div>
      </div>
    </div>
  );
}
