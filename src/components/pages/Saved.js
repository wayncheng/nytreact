import React, { Component } from "react";
import API from "../../utils/API";

class Saved extends Component {
	state = {
		docs: []
	};

	componentWillMount = () => {
		// GET saved via Axios
		API.getSaved()
			.then(result => {
				let docs = result.data;
				// result_docs = docs;

				this.setState({
					docs: docs
				});
				console.log("this.state.docs", this.state.docs);
			})
			.catch(error => console.log("error", error));
	};

	handleSaveClick = (title,url,date) => {
	// 	let postData = {
	// 		title: title,
	// 		url: url,
	// 		date: date,
	// 	}
	// 	console.log('postData',postData);

	// 	API.postSaved(postData)
	// 	.then(res => {
	// 		console.log('res.data',res.data);
	// 	})
	// 	.catch(err => console.log('err',err))

	// 	// this.setState({
	// 	// 	saveID: id
	// 	// })
	}

	render() {
		return (
			<main className="pg-saved">
				<header className="section header-slim">
					<h1>Saved</h1>
				</header>
				<article className="feed-container">
					<div className="feed-wrap">
						{this.state.docs.map((doc, index) => {
							return (
								<div
									id={index}
									className="box feed-item"
									key={index}
								>
									<span className="subrow subrow-1">
										<a className="url" href={doc.url}>
											<h4 className="title">
												{doc.title}
											</h4>
										</a>
										<a
											className="save-btn saved"
											href="#!"
											data-key={index}
											onClick={() =>
												this.handleSaveClick( doc._id )}
										>
											<i className="fa fa-heart" />
										</a>
									</span>
									<p className="pub_date">{doc.date}</p>
								</div>
							);
						})}
					</div>
				</article>
			</main>
		);
	}
}
export default Saved;
