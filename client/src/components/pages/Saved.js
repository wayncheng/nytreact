import React, { Component } from "react";
import API from "../../utils/API";
let result_docs = [];

class Saved extends Component {
	state = {
		docs: []
	};

	componentWillMount = () => {
		// GET saved via Axios
		API.getSaved()
			.then(result => {
				let docs = result.data;
				result_docs = docs;
				// Add saved state to each doc
				result_docs.map(doc => doc.saved = true)

				this.setState({
					docs: result_docs
				});
				console.log("this.state.docs", this.state.docs);
			})
			.catch(error => console.log("error", error));
	};

	handleSaveClick = (id,saved,index,title,url,date) => {
		console.log('id',id);
		if (saved) {
			API.deleteSaved(id,null)
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
											<h4 className="title"> {doc.title} </h4>
										</a>
										<a
											className="save-btn"
											href="#!"
											data-key={index}
											data-saved={doc.saved}
											onClick={() =>
												this.handleSaveClick( doc._id,doc.saved,index,doc.title,doc.url,doc.date )}
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
