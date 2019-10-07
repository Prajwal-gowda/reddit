import React from "react";
import { Icon } from "antd";
import "./comment.css";

const Comment = ({ comment, comments, ...props }) => {
  function clickHandle(id) {
    console.log(id);
    console.log(comments);
    props.updateComment(id);
  }

  const nestedComments = comments
    .filter(c => comment.id === c.parentId)
    .map(c => {
      return (
        <Comment
          key={c.id}
          comment={c}
          comments={comments}
          updateComment={props.updateComment}
        />
      );
    });

  return (
    <div className="comment-thread">
      <div>
        {comment.text}
        <button className="icon-btn" onClick={() => clickHandle(comment.id)}>
          <Icon type="edit" theme="filled" className="edit-icon" />
        </button>
      </div>
      {nestedComments}
    </div>
  );
};

export default Comment;
