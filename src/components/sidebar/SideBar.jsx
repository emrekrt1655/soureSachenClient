import React from "react";
import { Link } from "react-router-dom";
import LikedPosts from "./likedposts/LikedPosts";
import Modal from "../modal/modal";
import "./sidebar.css";

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal open={open} handleClose={handleClose} />
      <div className="sidebar">
        <div className="sidebarItem">
          <span className="sidebarTitle">
            Topic <i className="fas fa-angle-double-right"></i>
          </span>
          <div className="titleinfoSide">
            <i className="fab fa-buffer"></i>
            <p className="titleInfo">GSvTS </p>
          </div>
          <div className="titleinfoSide">
            <i className="fab fa-buffer"></i>
            <p className="titleInfo">Kadına Şiddet</p>
          </div>
          <div className="titleinfoSide">
            <i className="fab fa-buffer"></i>
            <p className="titleInfo">İkisideSözlşÖğrtEşdrmu </p>
          </div>
          <div className="titleinfoSide">
            <i className="fab fa-buffer"></i>
            <p className="titleInfo">SonRomantik12K </p>
          </div>
          <div className="titleinfoSide">
            <i className="fab fa-buffer"></i>
            <p className="titleInfo">SanaAşığım ZehSer </p>
          </div>
          <span className="">
            <div onClick={handleOpen} className="buttonAddTopic">
              <i className="fab fa-buffer"></i>
              <span style={{ margin: "5px" }}>Add Topic</span>
            </div>
          </span>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">CATEGORIES</span>
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
        <div className="sidebarItem">
          <div className="sidebarItem">
            <span className="sidebarTitle">THE MOST LIKED</span>
            <LikedPosts />
          </div>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">FOLLOW US</span>
          <div className="sidebarSocial">
            <div>
              <ul>
                <li>
                  <a href="#">
                    <span></span>
                    <span className="fa fa-facebook"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span></span>
                    <span></span>
                    <span className="fa fa-twitter"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span className="fa fa-instagram"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span className="fa fa-linkedin"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
