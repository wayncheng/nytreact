import React, { Component } from "react";
import Nav from "./Nav";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";

class Main extends Component {
  state = {
    currentPage: "Search"
  };

  render() {
    return (
      // <div id="all" className="root">
				  <Router>
						<div id="all">
							<Nav />
							<Route exact path="/" component={Home} />
							<Route exact path="/search" component={Search} />
							<Route exact path="/saved" component={Saved} />
						</div>
					</Router>
				
				
      // </div>
    );
  }
}

export default Main;
