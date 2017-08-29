import React, { Component } from "react";
import Nav from "./Nav";
import Search from "./pages/Search";
import Saved from "./pages/Saved";

const navObject = {
	Search: Search,
	Saved: Saved,
}

class Main extends Component {
  state = {
    currentPage: "Search"
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
	};
	
	renderPage = page => navObject[page]();

  render() {
    return (
      <div>
        <Nav
          currentPage={this.state.currentPage}
          handlePageChange={this.handlePageChange}
        />
				
				{this.renderPage(this.state.currentPage)}
				
      </div>
    );
  }
}

export default Main;
