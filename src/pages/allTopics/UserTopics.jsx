import * as React from "react";
import List from "@mui/material/List";

import Topbar from "../../components/topbar/Topbar";
import Topic from "./Topic";
import SideBarLeft from "../../components/sidebarleft/SideBarLeft";
import { sortListbyDate, sortListByDay } from "../../utils/sortListbyDate";
import { sortByPostCount } from "../../utils/sortByPostCount";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CountryFilter from "../../components/sidebar/countryfilter/CountryFilter";
import { useParams } from "react-router-dom";

export default function UserofTopics({
  posts,
  users,
  topics,
  authUser,
  followerData,
}) {
  const [open2, setOpen2] = React.useState(false);
  const [country, setCountry] = React.useState("Worldwide");
  const [filter, setFilter] = React.useState("");
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const { userId } = useParams();
  const profileOfUser = users?.find((u) => u?.userId === userId);
  const userofTopics = topics?.filter((t) => t.topicUserId === userId);
  const [value, setValue] = React.useState(0);
  const [lastAdded, setLastAdded] = React.useState(true);
  const [mostRated, setMostRated] = React.useState(false);
  const [filterCountry, setFilterCountry] = React.useState(false);
  const filteredCountryTopics = userofTopics?.filter(
    (topic) => topic.country === country
  );

  let topicList = lastAdded
    ? sortListbyDate(userofTopics)
    : mostRated
    ? sortByPostCount(userofTopics)
    : filterCountry
    ? sortListByDay(sortByPostCount(filteredCountryTopics))
    : userofTopics;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onLastAdded = () => {
    setLastAdded(true);
    setMostRated(false);
    setFilterCountry(false);
  };

  const onMostRated = () => {
    setLastAdded(false);
    setMostRated(true);
    setFilterCountry(false);
  };

  const onFilterCountry = () => {
    setLastAdded(false);
    setMostRated(false);
    setFilterCountry(true);
  };

  return (
    <>
      <CountryFilter
        open2={open2}
        handleClose2={handleClose2}
        setCountry={setCountry}
        setFilter={setFilter}
        country={country}
      />
      <Topbar user={authUser} />
      <div className="topics">
        <SideBarLeft
          profileOfUser={profileOfUser}
          followerData={followerData}
        />
        <div className="topics__topicsWrapper">
          <List
            className="topics__topicsWrapper--list"
            sx={{ width: "100%", maxWidth: 960, bgcolor: "background.paper" }}
          >
            <h1 className="topics__topicsWrapper--list__topicsTitle">TOPICS</h1>
            <Tabs
              className="homePageTabsSearch"
              value={value}
              onChange={handleChange}
            >
              <Tab
                className="homePageTabSearch"
                label="Last Added"
                onClick={() => onLastAdded()}
              />
              <Tab
                className="homePageTabSearch"
                label="Most Rated"
                onClick={() => onMostRated()}
              />
              <Tab
                className="homePageTabSearch"
                label="Filter Country"
                onClick={() => [handleOpen2(), onFilterCountry()]}
              />
            </Tabs>
            {topics && topicList?.length > 0
              ? topicList?.map((topic) => (
                  <Topic
                    key={topic?.topicId}
                    posts={posts}
                    users={users}
                    topic={topic}
                  />
                ))
              : " There is no Topic in this country"}
          </List>
        </div>
      </div>
    </>
  );
}
