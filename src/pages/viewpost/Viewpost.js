import React from "react";
import Navbar from "../../components/Navbar/navbar";
import PostDisplay from "../../components/postDisplay/PostDisplay";
import Comment from "../../components/comment/Comment";

import "./viewpost.css";
import db from "../../utils/DexieDb";
import { getData } from "../../utils/dbOperations";
const uuidv4 = require("uuid/v4");

class Viewpost extends React.Component {
  state = {
    postData: {},
    comments: [],
    commentField: "",
    cmt: []
  };

  commentStorage = commentObject => {
    db.table("comments")
      .add(commentObject)
      .then(id => {
        const newList = [
          ...this.state.cmt,
          Object.assign({}, commentObject, { id })
        ];
        this.setState({ cmt: newList });
      });
  };

  updateComment = id => {
    let postId = this.props.match.params.id,
      commentData = prompt("enter comment"),
      commentObject = {
        id: uuidv4(),
        text: commentData,
        postId: postId,
        parentId: id
      };
    commentObject.text !== ""
      ? this.commentStorage(commentObject)
      : alert("enter comment");
  };

  updateState = data => {
    this.setState({ postData: { ...data } });
  };

  addNewComment = () => {
    let postId = this.props.match.params.id;
    let commentObject = {
      id: uuidv4(),
      postId: postId,
      text: this.state.commentField,
      parentId: ""
    };
    commentObject.text !== ""
      ? this.commentStorage(commentObject)
      : alert("enter comment");
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  commentState = cmtData => {
    const postKey = this.props.match.params.id;
    let commentList = cmtData.filter(
      eachComment => eachComment.postId === postKey
    );
    this.setState({ cmt: commentList });
  };

  componentDidMount = () => {
    const key = this.props.match.params.id;
    getData(key);
    db.posts.get(key, this.updateState);
    db.table("comments").toArray(this.commentState);
  };
  render() {
    let postDetails = this.state.postData;
    return (
      <div className="view">
        <div className="navigation">
          <Navbar />
        </div>
        <PostDisplay postDetails={postDetails} />
        <textarea
          className="add-comment"
          type="text"
          name="commentField"
          placeholder="Enter comment"
          value={this.state.commentField}
          onChange={this.handleChange}
        />
        <button className="comment-btn" onClick={this.addNewComment}>
          Add Comment
        </button>
        {this.state.cmt
          .filter(c => c.parentId === "")
          .map(comment => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                comments={this.state.cmt}
                updateComment={this.updateComment}
              />
            );
          })}
      </div>
    );
  }
}

export default Viewpost;
