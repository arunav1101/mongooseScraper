const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newNews = new Schema({
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	img: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	},
	comments: [
		{
			commentBody: {
				type: String,
				required: true
			},
			commentDate: {
				type: Date,
				default: Date.now
			},
			commentUser: {
				type: String,
				default: 'User'
			}
		}
	]
});

module.exports = News = mongoose.model('News', newNews);
