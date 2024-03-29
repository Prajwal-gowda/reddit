import React from "react";
import Navbar from "../Navbar/navbar";
import PostDisplay from "../postDisplay/PostDisplay";
import Comment from "../comment/Comment";

import "./viewpost.css";
import db from "../../utils/DexieDb";
const uuidv4 = require("uuid/v4");

class Viewpost extends React.Component {
  state = {
    postData: {},
    comments: [],
    commentField: "",
    cmt: []
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

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  commentState = cmtData => {
    const postKey = this.props.match.params.id;
    console.log(cmtData);
    let commentList = cmtData.filter(
      eachComment => eachComment.postId === postKey
    );
    console.log(commentList);
    this.setState({ cmt: commentList });
  };

  componentDidMount = () => {
    const key = this.props.match.params.id;
    db.open();
    db.posts.get(key).then(data => {
      console.log(data);
      this.updateState(data);
    });

    db.table("comments")
      .toArray()
      .then(cmt => {
        this.commentState(cmt);
      });
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
