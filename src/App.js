import React from "react";
import "./App.css";
// import Layout from "./components/layout/layout";
import Layout from "./pages/layout/layout";
import Viewpost from "./pages/viewpost/Viewpost";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import Viewpost from "./components/viewpost/Viewpost";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Layout} />
        <Route path="/posts/:id" component={Viewpost} />
      </Router>
    </div>
  );
}

export default App;
