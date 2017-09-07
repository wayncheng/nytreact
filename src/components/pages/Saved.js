import React from 'react';
// import axios from 'axios';
import API from '../../utils/API';

function getSaved(){
	API.getSaved()
	.then(response => {
		console.log('got saved!');
		console.log('response',response);
		let feedData = response.data;
		return feedData;
	})
	.catch(error => console.log('error',error));
	// .then(() => {
	// 	this.setState({
	// 		docs: result_docs
	// 	})
	// 	console.log('this.state.docs',this.state.docs);
	// })
	// console.log('savedDocs',savedDocs);
}

const Saved = () =>
	<main>
		<h1>Saved</h1>
		<article className="container">
			{getSaved().map((doc) => {
				return (
					<div id={doc._id} className="box feed-item" key={doc._id}>
						<a className="url" href={doc.url}>
							<h4 className="title">{doc.title}</h4>
						</a>
						<p className="pub_date">{doc.date}</p>
						<a 
							className="save-btn button" 
							href="#!"
							data-key={doc._id}
							onClick={() => this.handleSaveClick(doc.title,doc.url,doc.date)}
							>
							<i className="fa fa-heart"></i>
							</a>
					</div>
				)
			})}
		</article>
	</main>;

export default Saved;