import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LikedPosts from "./likedposts/LikedPosts";
import Modal from "../modal/modal";
import "./sidebar.css";

export default function Sidebar() {
  let sortedCountTopics;
  let sortedDateTopics;
  const { authReducer, topicReducer } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState(false);
  const handleLastAdded = () => setLastAdded(!lastAdded);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = authReducer?.user;
  const topics = topicReducer?.data;

  const sorted2count = topics?.sort(function (topic1, topic2) {
    return topic2?._count.posts - topic1?._count.posts;
  });

  sortedCountTopics = sorted2count?.map((t) => t);
  const sorted2date = topics?.sort(function (topic1, topic2) {
    let dateTopic1 = new Date(topic1.createdAt);
    let dateTopic2 = new Date(topic2.createdAt);
    return dateTopic2 - dateTopic1;
  });
  sortedDateTopics = sorted2date?.map((t) => t);

  return (
    <div>
      <Modal open={open} handleClose={handleClose} />
      <div className="sidebar">
        <div className="sidebarItem">
          <span className="sidebarTitle">
            Topic{" "}
            <i
              className="fas fa-angle-double-right"
              onClick={handleLastAdded}
            ></i>
          </span>
          {topics && lastAdded
            ? sortedDateTopics?.slice(0, 9)?.map((t) => (
                <div className="titleinfoSide" key={t?.topicId}>
                  <i className="fab fa-buffer"></i>
                  <p className="titleInfo"> {t?.text} </p>
                </div>
              ))
            : sortedCountTopics?.slice(0, 9)?.map((t) => (
                <div className="titleinfoSide" key={t?.topicId}>
                  <i className="fab fa-buffer"></i>
                  <p className="titleInfo"> {t?.text} </p>
                </div>
              ))}

          <span className="">
            {user?.isTopicCreator === "true" && (
              <div onClick={handleOpen} className="buttonAddTopic">
                <i className="fab fa-buffer"></i>
                <span style={{ margin: "5px" }}>Add Topic</span>
              </div>
            )}
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
                  <a>
                    <span></span>
                    <span className="fa fa-facebook"></span>
                  </a>
                </li>
                <li>
                  <a>
                    <span></span>
                    <span></span>
                    <span className="fa fa-twitter"></span>
                  </a>
                </li>
                <li>
                  <a>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span className="fa fa-instagram"></span>
                  </a>
                </li>
                <li>
                  <a>
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
