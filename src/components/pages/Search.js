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
				
		// let baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
		let queryURL = baseURL + '?' + $.param({
			'api-key': "d689a3ae4786408c97d5be109fa52bea",
			'q': topic,
		  'begin_date': startYear,
		  'end_date': endYear
		});
		console.log('queryURL',queryURL);

		$.ajax({
		  url: queryURL,
		  method: 'GET',
		}).done(function(result) {
			console.log(result);
		  var docs = result.response.docs;
		  $('#results').empty();
		  
		  // for (var i=0; i<docs.length; i++) {
		  // 	var r = docs[i];
		  // };


		});



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
					<button className="button" id="submit">
						Search
					</button>
				</form>
			</main>
		);
	}
}
export default Search;