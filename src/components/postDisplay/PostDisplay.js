import React from "react";
import "./postdisplay.css";

const PostDisplay = ({ postDetails }) => {
  return (
    <div className="post-display">
      <span className="header-data">
        <h2 className="title-header">{postDetails.title} -</h2>
        <h3 className="author-header">{postDetails.author}</h3>
      </span>
      <hr className="header-break" />
      <img className="post-image" alt="post" src={postDetails.imgURL} />
      <p className="content-paragraph">{postDetails.content}</p>
    </div>
  );
};

export default PostDisplay;
