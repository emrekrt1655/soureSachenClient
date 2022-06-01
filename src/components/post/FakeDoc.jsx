import React from "react";
import "./fakeDoc.scss"

export const FakeDoc = () => {
  return (
    <div className="postContent">
      <div className="postContent__postFaceDoc">
        <img
          className="postContent__postFaceDoc--postImgFakeDOc"
          src="http://4.bp.blogspot.com/-vtlRCvTla7c/VHhbd8_2EpI/AAAAAAAAC9U/Y4v8ymvML0k/s1600/Sad-smiley-with-tears.png"
          alt="post"
        />
        <div className="postContent__postFaceDoc--postInfoHomePage">
          <p className="postContent__postFaceDoc--postInfoHomePage__postTitle">There are no posts yet, sorry</p>
          <p className="postContent__postFaceDoc--postInfoHomePage__postDesc"></p>
        </div>
      </div>
    </div>
  );
};
