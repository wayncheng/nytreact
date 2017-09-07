import React, {Component} from "react";
import axios from 'axios';
import API from '../../utils/API';
// import Results from '../Results';
let result_docs = [];
class Search extends Component {
	state = {
		topic: "",
		startYear: "",
		endYear: "",
		docs: [],
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
		console.log('topic',topic);
		console.log('startYear',startYear);
		console.log('endYear',endYear);

	// Basic form validation
		if (!topic) 
			alert('Enter a topic.')
		else if ((typeof parseInt(startYear,10) !== 'number') ) 
			alert('invalid start year')
		else if ((typeof parseInt(endYear,10) !== 'number')) 
			alert('invalid end year')
		else {
			console.log(`Searching for "${topic}" from ${startYear} to ${endYear}...`);
				
		let baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	// GET request using Axios
			axios.get(baseURL, {
				params: {
					// 'api-key': process.env.NYT_API_KEY,
					'api-key': '6ef54a119a2f4548a3284da2bc627cb7',
					'q': topic,
					'begin_date': startYear+'0101',
					'end_date': endYear+'0101'
				},
			})
			.then(function(result){
				let docs = result.data.response.docs;
				// console.log('docs',docs);
				console.log('# of results returned --',docs.length);
				// let slim_docs = docs.map((ea) => {
				result_docs = docs.map((ea) => {
					return {
						url: ea.web_url,
						date: ea.pub_date,
						title: ea.headline.main,
						saved: false,
					}
				});
			})
			.then(() => {
				this.setState({
					docs: result_docs
				})
				console.log('this.state.docs',this.state.docs);
			})
			.catch(function(error){
				console.log('error',error);
			})

			// clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
			// this.setState({
			// 	topic: "",
			// 	startYear: "",
			// 	endYear: "",
			// });
		}
	};

	handleSaveClick = (saved,index,title,url,date) => {

		if (saved) {
			API.deleteSaved(null,title)
			.then(res => {
				console.log('res',res);
				result_docs[index].saved = false;
				console.log('result_docs[index]',result_docs[index]);
				this.setState({
					docs: result_docs
				})
			})
			.catch(err => console.log('err',err))
		}
		else {

			let postData = {
				title: title,
				url: url,
				date: date,
			}
			console.log('postData',postData);
			
			API.postSaved(postData)
			.then(res => {
				// console.log('res',res)
				console.log('res.data',res.data);
				result_docs[index].saved = true;
				console.log('result_docs[index]',result_docs[index]);
				this.setState({
					docs: result_docs
				})
			})
			.catch(err => console.log('err',err))
		}
	}

	render() {
		return (
			<main>
				<header className="section">
					<div id="search-container" className="section-content">
						<h2>Search</h2>
						<form className="form">
							<input
								className="input"
								value={this.state.topic}
								name="topic"
								onChange={this.handleInputChange}
								type="text"
								placeholder="Search..."
							/>
							<input
								className="input"
								value={this.state.startYear}
								name="startYear"
								onChange={this.handleInputChange}
								type="text"
								placeholder="Start Year"
							/>
							<input
								className="input"
								value={this.state.endYear}
								name="endYear"
								onChange={this.handleInputChange}
								type="text"
								placeholder="End Year"
							/>
							<button 
								className="button is-dark" 
								id="submit"
								onClick={this.handleFormSubmit}
							>
								Search
							</button>
						</form>
					</div>
				</header>
				{/* <Results docs={result_docs}/> */}
				<article className="feed-container">
				<div className="feed-wrap">
					{this.state.docs.map((doc,index) => {
						return (
							<div id={index} className="box feed-item" key={index}>
							<span className="subrow subrow-1">
								<a className="url" href={doc.url}>
									<h4 className="title">{doc.title}</h4>
								</a>
								<a 
									className="save-btn" 
									href="#!"
									data-saved={doc.saved}
									data-key={index}
									onClick={() => this.handleSaveClick(doc.saved,index,doc.title,doc.url,doc.date)}
									>
									<i className="fa fa-heart"></i>
									</a>
							</span>
							<p className="pub_date">{doc.date}</p>
							</div>
						)
					})}
					</div>
				</article>
			</main>
		);
	}
}
export default Search;