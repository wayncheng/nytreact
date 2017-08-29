import React from "react";

const Nav = props => (
	<nav class="navbar">
		<div class="navbar-menu">
			<ul class="navbar-start">
				<li>
					<a
						class="navbar-item"
						href="/search"
						onClick={() => props.handlePageChange("Search")}
					>
						Search
					</a>
				</li>
				<li>
					<a
						class="navbar-item"
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
