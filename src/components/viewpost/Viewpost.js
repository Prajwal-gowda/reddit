import React from "react";
import Navbar from "../Navbar/navbar";
import PostDisplay from "../postDisplay/PostDisplay";
import "./viewpost.css";
import db from "../../utils/DexieDb";

class Viewpost extends React.Component {
  state = {
    postData: {}
  };

  updateState = data => {
    this.setState({ postData: { ...data } });
  };

  componentDidMount = () => {
    const key = this.props.match.params.id;
    db.open();
    db.posts.get(key).then(data => {
      console.log(data);
      this.updateState(data);
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
      </div>
    );
  }
}

export default Viewpost;
