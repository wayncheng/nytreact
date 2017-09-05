import React from "react";

const Nav = props => (
	<nav className="navbar">
		<div className="navbar-menu">
			<ul className="navbar-start">
				<li>
					<a
						className="navbar-item"
						href="/"
						onClick={() => props.handlePageChange("Home")}
					>
						Home
					</a>
				</li>
				<li>
					<a
						className="navbar-item"
						href="/search"
						onClick={() => props.handlePageChange("Search")}
					>
						Search
					</a>
				</li>
				<li>
					<a
						className="navbar-item"
						href="/saved"
						onClick={() => props.handlePageChange("Saved")}
					>
						Saved
					</a>
				</li>
			</ul>
		</div>
	</nav>
);

export default Nav;
