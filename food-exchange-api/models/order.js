const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	date: {
		created_date: { type: Date },
		created_hour: { type: String }
	},
	created_at: { type: Date, default: Date.now },
	customer: { type: String },
	delivered: { type: Boolean, default: false },
	cancelled: { type: Boolean, default: false },
	food: { type: String, default: "Rice"}
});

module.exports = mongoose.model('Order', orderSchema);