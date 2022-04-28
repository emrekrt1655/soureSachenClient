import React, { useState } from "react";
import Scroll from "./Scroll";
import SearchList from "./SearchList";
import { useSelector } from "react-redux";

const SearchBar = ({ topics, posts }) => {
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

  const handleChange = (e) => {
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
      <div className="searchButtonContainer">
        <div className="searchButtonState" onClick={onSetStatetopic}>
          <span className={search === "Topic" && "active"}>Topic</span>
        </div>
        <div className="searchButtonState" onClick={onSetStateopinion}>
          <span className={search === "Opinion" && "active"}>Opinion</span>
        </div>
        <div className="searchButtonState" onClick={onSetStateuser}>
          <span className={search === "User" && "active"}>User</span>
        </div>
      </div>
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder={`Search a ${search}...`}
          onChange={handleChange}
        />
        <button type="submit" className="searchButton">
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
