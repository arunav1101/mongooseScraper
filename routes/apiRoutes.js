const express = require('express');
const cheerio = require('cheerio');
const router = express.Router();
const axios = require('axios');
const News = require('../models/news');
var db = require('../models/news');
var mongoose = require("mongoose");

const url = "https://www.nytimes.com";

router.get("/scrape",  (req, res) => {
	// First, we grab the body of the html with axios
	const promise = new Promise((resolve, reject) => {
		axios.get(url).then( (response) => {
			// Then, we load that into cheerio and save it to $ for a shorthand selector
			var $ = cheerio.load(response.data);
			// Now, we grab every h2 within an article tag, and do the following:
			$('h2').each( (i, element) => {
				// Save an empty result object
				var result = {};
				// Add the text and href of every link, and save them as properties of the result object
				if ($(element).parent().parent().attr("href")) {
				 axios.get(url + $(element).parent().parent().attr("href"))
						.then((linkImages) => {
							var $$ = cheerio.load(linkImages.data);
							result.img = $$('img').attr('src');
							result.title = $(element)
								.text();
							result.link = url + $(element)
								.parent().parent().attr("href");
							 db.create(result).then(() => {
								db.find({}).then((dbData) => {
									if (dbData.length > 0) resolve("Success!")
								})
							})
								.catch((err) =>{
									// If an error occurred, log it
									console.log(err);
									reject()
								});
						})
				}
			})
		});
	})
	promise.then(() => {
		res.redirect('/');
	});
});

router.get('/clear', (req, resp) => {
	News.deleteMany().then(() => {
		resp.redirect('/');
	});
});

router.put('/comment', (req, resp) => {
	const newComment = {
		commentBody: req.body.commentBody,
		commentUser: req.body.commentUser
	};
	News.findById({
		_id: req.body.articleId
	}).then((newArticle) => {
		newArticle.comments.unshift(newComment);
		newArticle.save().then(() => resp.redirect('/'));
	});
});

module.exports = router;
