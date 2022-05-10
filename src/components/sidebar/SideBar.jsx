import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import LikedPosts from "./likedposts/LikedPosts";
import Modal from "../modal/modal";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@mui/material/Tooltip";
import "./sidebar.css";
import SearchBar from "./searchBar/SearchBar";
import CountryFilter from "./countryfilter/CountryFilter";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "medium",
    "&:hover, &.Mui-focusVisible": { fontSize: "large" },
  },
}));

export default function Sidebar({
  postData,
  topicData,
  likeData,
  user,
  access_token,
}) {
  const history = useHistory();
  const classes = useStyles();
  let sortedCountTopics;
  let sortedDateTopics;
  let topicList;
  const [country, setCountry] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [filter, setFilter] = useState("mostRated");
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);

  const topics = topicData;
  const filteredCountryTopics = topics?.filter(
    (topic) => topic.country === country
  );

  if (filter === "mostRated" && country === "") {
    topicList = topics;
  }
  if (filter === "lastAdded" && country === "") {
    topicList = topics;
  }

  if (filter === "countryTopic") {
    topicList = filteredCountryTopics;
  }

  if (filter === "mostRated" && country) {
    topicList = filteredCountryTopics;
  }

  if (filter === "lastAdded" && country) {
    topicList = filteredCountryTopics;
  }

  const sorted2count = topicList?.sort(function (topic1, topic2) {
    return topic2?._count.posts - topic1?._count.posts;
  });

  sortedCountTopics = sorted2count?.map((t) => t);
  const sorted2date = topicList?.sort(function (topic1, topic2) {
    let dateTopic1 = new Date(topic1.createdAt);
    let dateTopic2 = new Date(topic2.createdAt);
    return dateTopic2 - dateTopic1;
  });
  sortedDateTopics = sorted2date?.map((t) => t);

  const { authReducer, userReducer } = useSelector((state) => state);
  const authUser = authReducer?.user?.userId;

  return (
    <div>
      <CountryFilter
        open2={open2}
        handleClose2={handleClose2}
        setCountry={setCountry}
        setFilter={setFilter}
      />

      <Modal open={open} handleClose={handleClose} />
      <div className="sidebar">
        <div className="sidebarItem">
          <SearchBar topics={topics} posts={postData} />
        </div>
        <div className="sidebarItem">
          <div className="sidebarHead">
            <span className="sidebarTitle">Topic</span>
            <div className="sidebarIcons">
              <Tooltip title="Most Rated">
                <LocalFireDepartmentIcon
                  className={classes.root}
                  onClick={() => setFilter("mostRated")}
                />
              </Tooltip>
              <Tooltip title="Last Added">
                <HourglassTopIcon
                  className={classes.root}
                  onClick={() => setFilter("lastAdded")}
                />
              </Tooltip>
              <Tooltip title="Filter Country">
                <SettingsApplicationsIcon
                  className={classes.root}
                  onClick={handleOpen2}
                />
              </Tooltip>
            </div>
          </div>
          <div className="sidebarTopic">
            {topics && filter === "mostRated" ? (
              sortedCountTopics?.slice(0, 9)?.map((t) => (
                <div className="titleinfoSide" key={t?.topicId}>
                  <i className="fab fa-buffer"></i>
                  <div className="titleInfoPart">
                    <p
                      className="titleInfo"
                      onClick={() => history.push(`/${t?.topicId}`)}
                    >
                      {" "}
                      {t?.text?.length < 25
                        ? t?.text
                        : t?.text?.slice(0, 25) + "..."}{" "}
                    </p>
                    <p className="titleCountry"> {t?.country} </p>
                  </div>
                </div>
              ))
            ) : filter === "lastAdded" ? (
              sortedDateTopics?.slice(0, 9)?.map((t) => (
                <div className="titleinfoSide" key={t?.topicId}>
                  <i className="fab fa-buffer"></i>
                  <div className="titleInfoPart">
                    <p
                      className="titleInfo"
                      onClick={() => history.push(`/topic/${t?.topicId}`)}
                    >
                      {" "}
                      {t?.text?.length < 25
                        ? t?.text
                        : t?.text?.slice(0, 25) + "..."}{" "}
                    </p>
                    <p className="titleCountry"> {t?.country} </p>
                  </div>
                </div>
              ))
            ) : filteredCountryTopics?.length > 0 ? (
              topicList?.slice(0, 9)?.map((t) => (
                <div className="titleinfoSide" key={t?.topicId}>
                  <i className="fab fa-buffer"></i>
                  <div className="titleInfoPart">
                    <p
                      className="titleInfo"
                      onClick={() => history.push(`/topic/${t?.topicId}`)}
                    >
                      {" "}
                      {t?.text?.length < 25
                        ? t?.text
                        : t?.text?.slice(0, 25) + "..."}{" "}
                    </p>
                    <p className="titleCountry"> {t?.country} </p>
                  </div>
                </div>
              ))
            ) : (
              <h4> There is no topics in this country </h4>
            )}

            <div className="addButtonContainer">
              {user?.isTopicCreator === "true" && (
                <div onClick={handleOpen} className="buttonAddTopic">
                  <i className="fab fa-buffer"></i>
                  <span style={{ margin: "5px" }}>Add Topic</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="sidebarItem">
          <div className="sidebarItem">
            <span className="sidebarTitle">THE MOST LIKED</span>
            <LikedPosts
              postData={postData}
              topicData={topicData}
              likeData={likeData}
              user={user}
              access_token={access_token}
            />
          </div>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">FOLLOW US</span>

          <div className="sidebarSocial">
            <div>
              <ul>
                <li>
                  <a href="https://faris35kanbur.medium.com/">
                    <span></span>
                    <span className="fa fa-facebook"></span>
                  </a>
                </li>
                <li>
                  <a href="https://faris35kanbur.medium.com/">
                    <span></span>
                    <span></span>
                    <span className="fa fa-twitter"></span>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Faris-Kanbur">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span className="fa fa-instagram"></span>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Faris-Kanbur">
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
