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

	// Use morgan with app
	app.use(logger("dev"));

	// Set Body Parser
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.text());
	app.use(bodyParser.json({ type: "application/vnd.api+json" }));

	// logs each url that is requested, then passes it on.
	app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
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
		console.log('POST /api/saved');
		if (err) throw err;
		else {
			// Post to MongoDB /////////////////////////////////
			console.log('req.body',req.body);
			// var entry = new Article({
			// 	title: 'Two three four five',
			// 	url: 'https://che.ng',
			// 	date: '2014-12-31T13:11:37Z'
			// });

			// // Now, save that entry to the db
			// entry.save(function(err, doc) {
			// 	if (err) throw err;
			// 	else {
			// 		console.log(doc);
			// 	}
			// });
			////////////////////////////////////////////////////
		}
	});
	// POST SAVED ==================================================
	app.delete("/api/saved", function(req, res) {
		console.log('DELETE /api/saved');
		if (err) throw err;
		else {
			////////////////////////////////////////////////////
			// Render document /////////////////////////////////
			////////////////////////////////////////////////////
		}
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
	app.use(function(req, res) {
		res.type("text/html");
		res.status(404);
		res.render("404");
	});

	app.use(function(err, req, res, next) {
		console.error(err.stack);
		res.status(500);
		res.render("500");
	});

	// START SERVER ===================================
	app.listen(port, function() {
		console.log(`-------------------------------------------------------
                                          ready @ ${port}`);
	});
	//==================================================
})();