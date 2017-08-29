import React, {Component} from "react";

class Search extends Component {
	state = {
		topic: "",
		startYear: "",
		endYear: "",
	};

	handleInputChange = event => {
		const value = event.target.value;
		const name = event.target.name;

		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		// Preventing the default behavior of the form submit (which is to refresh the page)
		event.preventDefault();
		let { topic, startYear, endYear } = this.state;

		if (!topic) {
			alert('Enter a topic.')
		}
		else if (parseInt(startYear).isNaN()) {
			alert('invalid start year')
		}
		else if (parseInt(endYear).isNaN()) {
			alert('invalid end year')
		}
		else {
			console.log(`Searching for ${topic} from ${startYear} to ${endYear}...`);

			// clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
			this.setState({
				topic: "",
				startYear: "",
				endYear: "",
			});
		}
	};

	render() {
		return (
			<main>
				<h1>Search</h1>
				<form className="form">
					<input
						className="input"
						value={this.state.firstName}
						name="topic"
						onChange={this.handleInputChange}
						type="text"
						placeholder="e.g. bananas"
					/>
					<input
						className="input"
						value={this.state.firstName}
						name="startYear"
						onChange={this.handleInputChange}
						type="text"
						placeholder="e.g. 2001"
					/>
					<input
						className="input"
						value={this.state.firstName}
						name="endYear"
						onChange={this.handleInputChange}
						type="text"
						placeholder="e.g. 2018"
					/>

				</form>
			</main>
		);
	}
}
export default Search;