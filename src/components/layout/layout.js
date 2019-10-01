import React, { Component } from "react";

import Navbar from "../Navbar/navbar";
import Form from "../Form/form";
import Post from "../post/post";
import db from "../../utils/DexieDb";

import "./layout.css";

export class Layout extends Component {
  state = {
    posts: [],
    showForm: false
  };

  renderPost = (individualPost, index) => (
    <Post postData={individualPost} key={index} />
  );
  addPost = postObj => {
    this.setState({ posts: [...this.state.posts, postObj] });
  };

  toggleForm = () => {
    this.setState(prevState => ({ showForm: !prevState.showForm }));
  };

  componentDidMount = () => {
    db.table("posts")
      .toArray()
      .then(posts => {
        this.setState({ posts });
      });
  };

  render() {
    let formData;
    if (this.state.showForm) {
      formData = (
        <Form
          formStatus={this.state.showForm}
          formToggle={this.toggleForm}
          addPost={this.addPost}
        />
      );
    }
    return (
      <div>
        <Navbar formToggle={this.toggleForm} />
        {formData}
        {this.state.posts.map((individualPost, index) =>
          this.renderPost(individualPost, index)
        )}
      </div>
    );
  }
}

export default Layout;
