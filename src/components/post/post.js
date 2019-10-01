import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./post.css";

export class Post extends Component {
  render() {
    const postData = this.props.postData;
    return (
      <div className="post-container">
        <img className="post-img" alt="post image" src={postData.imgURL} />
        <span className="title-element">
          {postData.title}-
          <span className="author-element"> {postData.author} </span>
        </span>
        <p className="content-element">{postData.content}</p>
        <Link to={`/posts/${postData.id}`}>
          <button className="view-post">Check Post</button>
        </Link>
      </div>
    );
  }
}

Post.propTypes = {
  postData: PropTypes.object.isRequired
};

Post.defaultProps = {
  postData: {}
};

export default Post;
