const express = require('express');
const router = express.Router();
const News = require('../models/news');


router.get('/', (req, resp) => {
	News.find().sort([ [ 'date', -1 ] ]).then((res) => {
		resp.render('index', {
			news: res
		});
	});
});
module.exports = router;
