import React from 'react';
// import axios from 'axios';
import API from '../../utils/API';

function getSaved(){
	API.getSaved()
	.then(response => {
		console.log('got saved!');
		console.log('response',response);
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
			{getSaved()}
		</article>
	</main>;

export default Saved;