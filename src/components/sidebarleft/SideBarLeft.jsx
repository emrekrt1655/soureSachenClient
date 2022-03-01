import React from "react";
import { Link } from "react-router-dom";
import ProfilCard from "./profilCard/ProfilCard";
import LikedPosts from "./profilCard/ProfilCard";
import "./sidebarLeft.css";

export default function SideBarLeft() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <ProfilCard />
      <div className="sidebarItem">
        <span className="sidebarTitle">WHO ARE FOLLOWED</span>
        <div className="sidebarList">
          <div className="sidebarListItem">
            <Link className="link" to="/posts?cat=Life">
              Life
            </Link>
          </div>
          <div className="sidebarListItem">
            <Link className="link" to="/posts?cat=Music">
              Music
            </Link>
          </div>
          <div className="sidebarListItem">
            <Link className="link" to="/posts?cat=Sport">
              Sport
            </Link>
          </div>
          <div className="sidebarListItem">
            <Link className="link" to="/posts?cat=Style">
              Style
            </Link>
          </div>
          <div className="sidebarListItem">
            <Link className="link" to="/posts?cat=Tech">
              Tech
            </Link>
          </div>
          <div className="sidebarListItem">
            <Link className="link" to="/posts?cat=Cinema">
              Cinema
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
