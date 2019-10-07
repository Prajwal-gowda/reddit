import React from "react";
import "./form.css";
import db from "../../utils/DexieDb";
import Button from "../button/Button";
import Inputfield from "../inputfield/InputField";
import PropTypes from "prop-types";
const uuidv4 = require("uuid/v4");

class Form extends React.Component {
  state = {
    title: "",
    author: "",
    content: "",
    imgURL: ""
  };

  addTask = () => {
    const postObj = {};
    postObj.id = uuidv4();
    postObj.title = this.state.title;
    postObj.author = this.state.author;
    postObj.content = this.state.content;
    postObj.imgURL = this.state.imgURL;
    postObj.comments = [];
    console.log(postObj);

    // adding data to db
    db.open();

    if (
      postObj.title !== "" &&
      postObj.author !== "" &&
      postObj.content !== "" &&
      postObj.imgURL !== ""
    ) {
      this.props.addPost(postObj);
      db.posts.add(postObj);
    } else {
      alert("fill in the input fileds");
    }

    this.props.formToggle();
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    const formStatus = this.props.formStatus,
      formToggle = this.props.formToggle;

    if (formStatus === true) {
      return (
        <div className="form-container">
          <h2 className="form-header">Add Post</h2>
          <Inputfield
            label="Title:"
            id="form-title"
            type="text"
            placeholder="Enter Title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <Inputfield
            label="Author:"
            id="form-author"
            type="text"
            placeholder="Enter Author"
            name="author"
            value={this.state.author}
            onChange={this.handleChange}
            required
          />
          <Inputfield
            label="Content:"
            id="form-content"
            type="text"
            placeholder="Enter content"
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
            required
          />
          <Inputfield
            label="imgURL:"
            id="form-img"
            type="url"
            placeholder="Enter image URL"
            name="imgURL"
            value={this.state.imgURL}
            onChange={this.handleChange}
          />
          <Button buttonText="Submit" onClick={this.addTask} />
          <Button buttonText="cancel" onClick={formToggle} />
        </div>
      );
    }
  }
}

Form.propTypes = {
  formStatus: PropTypes.bool.isRequired,
  formToggle: PropTypes.func.isRequired
};

Form.defaultProps = {
  formStatus: true,
  formToggle: () => {}
};

export default Form;
