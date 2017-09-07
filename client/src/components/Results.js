import React from "react";

const Results = props => (
	<article className="results-container">
		{this.state.docs.map((doc,index) => {
			return (
				<div id={index} className="box feed-item" key={index}>
					<a className="url" href={doc.url}>
						<h4 className="title">{doc.title}</h4>
					</a>
					<p className="pub_date">{doc.date}</p>
					<a 
						className="save-btn button" 
						href="#!"
						data-key={index}
						onClick={() => this.handleSaveClick(doc.title,doc.url,doc.date)}
						>
						<i className="fa fa-heart"></i>
						</a>
				</div>
			)
		})}
		
	</article>
)

export default Results;