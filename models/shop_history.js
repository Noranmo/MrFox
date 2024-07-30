const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shopHistorySchema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		zip: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		suma: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
)

const History = mongoose.model('History', shopHistorySchema)

module.exports = History
