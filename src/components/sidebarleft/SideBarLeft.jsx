import React from "react";
import { FollowedList } from "./followedList/FollowedList";
import ProfilCard from "./profilCard/ProfilCard";
import "./sidebarLeft.css";

export default function SideBarLeft({ profileOfUser, followerData }) {
  return (
    <div className="sidebarLeft">
      <ProfilCard profileOfUser={profileOfUser} followerData={followerData} />
      <div className="sidebarLeftItem">
        <span className="sidebarLeftTitle">WHO ARE FOLLOWED</span>
        <div className="sidebarLeftList">
          <FollowedList />
        </div>
      </div>
    </div>
  );
}
