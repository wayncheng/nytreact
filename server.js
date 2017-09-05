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

	// Set Static Directory
	// app.use(express.static(path.join(__dirname, "public")));

	// Set Handlebars
	// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
	// app.set("view engine", "handlebars");

	// Use morgan with app
	app.use(logger("dev"));

	// Set Body Parser
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.text());
	app.use(bodyParser.json({ type: "application/vnd.api+json" }));

	// logs each url that is requested, then passes it on.
	app.use(function(req, res, next) {
		console.log("url : " + req.url);
		next();
	});
	//=================================================
	mongoose.connect(process.env.MONGODB_URI);
	// mongoose.connect('mongodb://localhost:27017');
	mongoose.connect("mongodb://localhost/nytreact");
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
	// 	  title: 'Pizza is delicious.',
	// 	  link: 'https://che.ng',
	// 	  author: 'Batman Batman',
	// 	  author_profile: 'https://instagram.com/wayncheng',
	// 	  date: 'Aug 24'
	//   });

	//   // Now, save that entry to the db
	//   entry.save(function(err, doc) {
	// 	if (err) { console.log(err); }
	// 	else {
	// 	  console.log(doc);
	// 	}
	//   });

	//==================================================
	let newArticleCount = 0;

	
	// GET SAVED ==================================================
	app.get("/api/saved", function(req, res) {
		Article.find({ saved: true }, function(err, docs) {
			if (err) console.log(err);
			else {
				////////////////////////////////////////////////////
				// Render document /////////////////////////////////
				////////////////////////////////////////////////////
			}
		});
	});

	// POST SAVED ==================================================
	app.post("/api/saved", function(req, res) {
		if (err) throw err;
		else {
			////////////////////////////////////////////////////
			// Render document /////////////////////////////////
			////////////////////////////////////////////////////
		}
	});
	// POST SAVED ==================================================
	app.delete("/api/saved", function(req, res) {
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