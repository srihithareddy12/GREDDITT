const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		fname: { type: String, required: true },
		lname: { type: String, required: true },
		uname: { type: String, required: true , unique: true },
		email: { type: String, required: true, unique: true },
		contact: { type: String, required: true },
		age: { type: String, required: true },
		password: { type: String, required: true },
		followers: [{ type: String }],
		following: [{ type: String}],
	},
	{ collection: 'user-data' }
)

const model = mongoose.model('UserData', User)

module.exports = model