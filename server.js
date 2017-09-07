"use strict";
(function() {
	// DEPENDENCIES ===================================
	const express = require("express");
	const bodyParser = require("body-parser");
	const logger = require("morgan");
	const path = require("path");
	require("dotenv").config();

	// CONFIG =======================================
	const mongoose = require("mongoose");
	const Article = require("./models/Article.js");
	mongoose.Promise = Promise;

	const app = express();
	const port = process.env.PORT || 5000;

	app.disable("x-powered-by");

// 	app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });
	// Set Static Directory
	// app.use(express.static(path.join(__dirname, "public")));

	app.set('view engine', 'jsx');
	app.engine('jsx', require('express-react-views').createEngine());

	app.use(logger("dev")); // Use morgan with app

	// Set Body Parser
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.text());
	app.use(bodyParser.json({ type: "application/vnd.api+json" }));

	// logs each url that is requested, then passes it on.
	app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

		console.log("url : " + req.url);
		next();
	});
	//=================================================
	if (process.env.NODE_ENV === 'production') {
		mongoose.connect(process.env.MONGODB_URI);
	}
	else {
		mongoose.connect("mongodb://localhost/nytreact");
	}
	// mongoose.connect('mongodb://localhost:27017');
	var db = mongoose.connection;

	db.on("error", function(err) {
		console.log("Mongoose error:", err);
	});
	db.once("open", function() {
		// we're connected!
		console.log("Mongoose connected!");
	});

	var Schema = mongoose.Schema;

	//=================================================
	//   var entry = new Article({
	// 	  title: 'Two three four five',
	// 	  url: 'https://che.ng',
	// 	  date: '2014-12-31T13:11:37Z'
	//   });

	// // Now, save that entry to the db
	//   entry.save(function(err, doc) {
	// 	if (err) { console.log(err); }
	// 	else {
	// 	  console.log(doc);
	// 	}
	//   });

	// Fix req.body Objecy issue ==================================
	const fixReqBody = reqBody => JSON.parse(Object.keys(reqBody)[0]);

	// GET SAVED ==================================================
	app.get("/api/saved", function(req, res) {
		console.log('GET /api/saved');
		Article.find(function(err, docs) {
			if (err) console.log(err);
			else {
				////////////////////////////////////////////////////
				// Render document /////////////////////////////////
				////////////////////////////////////////////////////
				console.log('server.js docs',docs);
				res.json(docs)
			}
		});
	});

	// POST SAVED ==================================================
	app.post("/api/saved", function(req, res) {
		console.log('--> POST /api/saved');
		// console.log('req.body',req.body);

		// Fix the weird data format of req.body
		// var reqFixed = JSON.parse(Object.keys(req.body)[0]);
		let reqFixed = fixReqBody(req.body);
		let {title, url, date} = reqFixed;
		console.log('title',title);
		console.log('url',url);
		console.log('date',date);		

			// Post to MongoDB /////////////////////////////////
			let entry = new Article({
				title: title,
				url: url,
				date: date
			});

			entry.save(function(err, doc) {
				if (err) {
					console.log('err',err);
					res.send('There was an error saving this article')
				}
				else {
					console.log(doc);
					res.send('Saved to DB!')
				}
			});
			////////////////////////////////////////////////////
		// }
	});
	// DELETE SAVED ==================================================
	app.delete("/api/saved", function(req, res) {
		console.log('>>> DELETE /api/saved');
		let reqFixed = fixReqBody(req.body);

		// Delete document /////////////////////////////////
		Article.remove({_id: reqFixed._id}, err => {
			if (err) return handleError(err);
			else {
				res.send('article removed.')
			}
		})
		////////////////////////////////////////////////////
	});

	// GENERAL GETS ==================================================
	app.get("/", function(req, res) {
		Article.find({}).exec(function(error, doc) {
			if (error) {
				console.log(error);
			} else {
				////////////////////////////////////////////////////
				// Render document /////////////////////////////////
				////////////////////////////////////////////////////
			}
		});
	});

	// ERRORS =========================================
	// app.use(function(req, res) {
	// 	res.status(404);
	// 	res.send("404");
	// });

	// app.use(function(err, req, res, next) {
	// 	console.error(err.stack);
	// 	res.status(500);
	// 	res.send("500");
	// });

	// START SERVER ===================================
	app.listen(port, function() {
		console.log(`-------------------------------------------------------
                                          ready @ ${port}`);
	});
	//==================================================
})();