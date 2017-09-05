import React, { Component } from "react";
import Nav from "./Nav";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";

// const navObject = {
// 	Search: Search,
// 	Saved: Saved,
// }

class Main extends Component {
  state = {
    currentPage: "Search"
  };

  // handlePageChange = page => {
  //   this.setState({ currentPage: page });
	// };
	
	// renderPage = page => navObject[page]();

  render() {
    return (
      <div>
				  <Router>
						<div>
							{/* <Nav currentPage={this.state.currentPage} handlePageChange={this.handlePageChange} /> */}
							<Nav />
							<Route exact path="/" component={Home} />
							<Route exact path="/search" component={Search} />
							<Route exact path="/saved" component={Saved} />
						</div>
					</Router>
				
				{/* {this.renderPage(this.state.currentPage)} */}
				
      </div>
    );
  }
}

export default Main;
