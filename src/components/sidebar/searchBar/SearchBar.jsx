import React, { useState } from "react";
import Scroll from "./Scroll";
import SearchList from "./SearchList";
import { useSelector } from "react-redux";
import "./searchBar.scss";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const SearchBar = ({ topics, posts }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const users = useSelector((state) => state?.userReducer?.data);

  const [searchTopicField, setSearchTopicField] = useState("");
  const [searchPostField, setSearchPostField] = useState("");
  const [searchUserField, setSearchUserField] = useState("");
  const [search, setSearch] = useState("Topic");

  const filteredTopics = topics?.filter((topic) => {
    return topic.text.toLowerCase().includes(searchTopicField.toLowerCase());
  });

  const filteredUsers = users?.filter((user) => {
    return user.userName.toLowerCase().includes(searchTopicField.toLowerCase());
  });

  const filteredPosts = posts?.filter((post) => {
    return post.text.toLowerCase().includes(searchPostField.toLowerCase());
  });

  const handleChangeTopic = (e) => {
    setSearchTopicField(e.target.value);
    setSearchPostField(e.target.value);
    setSearchUserField(e.target.value);
  };

  function searchTopicList() {
    return (
      <>
        <Scroll>
          <SearchList filteredTopics={filteredTopics} />
        </Scroll>
      </>
    );
  }

  function searchPostList() {
    return (
      <>
        <Scroll>
          <SearchList filteredPosts={filteredPosts} />
        </Scroll>
      </>
    );
  }

  function searchUserList() {
    return (
      <>
        <Scroll>
          <SearchList filteredUsers={filteredUsers} />
        </Scroll>
      </>
    );
  }

  const onSetStateuser = (e) => {
    e.stopPropagation();
    setSearch("User");
  };

  const onSetStatetopic = (e) => {
    e.stopPropagation();
    setSearch("Topic");
  };

  const onSetStateopinion = (e) => {
    e.stopPropagation();
    setSearch("Opinion");
  };

  return (
    <div className="wrap">
      <Tabs
        className="homePageTabsSearch"
        value={value}
        onChange={handleChange}
      >
        <Tab
          className="homePageTabSearch"
          label="Topic"
          onClick={onSetStatetopic}
        />
        <Tab
          className="homePageTabSearch"
          label="Opinion"
          onClick={onSetStateopinion}
        />
        <Tab
          className="homePageTabSearch"
          label="User"
          onClick={onSetStateuser}
        />
      </Tabs>
      <div className="wrap__search">
        <input
          type="text"
          className="wrap__search--searchTerm"
          placeholder={`Search a ${search}...`}
          onChange={handleChangeTopic}
        />
        <button type="submit" className="wrap__search--searchButton">
          <i className="fa fa-search"></i>
        </button>
      </div>
      <div>
        {searchTopicField && search === "Topic" && searchTopicList()}
        {searchPostField && search === "Opinion" && searchPostList()}
        {searchUserField && search === "User" && searchUserList()}
      </div>
    </div>
  );
};

export default SearchBar;
