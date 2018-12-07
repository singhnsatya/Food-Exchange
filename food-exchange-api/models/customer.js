const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
	date: {
		created_date: { type: Date },
		created_hour: { type: String }
	},
	created_at: { type: Date, default: Date.now },
	name: { type: String },
	// timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);