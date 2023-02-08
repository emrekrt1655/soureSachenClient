import React from "react";
import ProfilCard from "./profilCard/ProfilCard";
import WoToFollow from "../sidebar/whoToFollow/WhoToFollow";

import "./sidebarLeft.scss";

export default function SideBarLeft({ profileOfUser, followerData }) {
  return (
    <div className="sidebarLeft">
      <ProfilCard profileOfUser={profileOfUser} followerData={followerData} />
      <div className="sidebarLeft__sidebarLeftItem">
        <WoToFollow followerData={followerData}  />
      </div>
    </div>
  );
}
