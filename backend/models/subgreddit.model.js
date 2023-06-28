const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
	content: String,
	user: {type : String},
	upvotes: [{ type: String}],
	downvotes: [{ type: String}],
	gredditname:{type:String},
	savedposts:[{type: String}],
	comments: [{type: String}],
  })

const Subgredditt = new mongoose.Schema(
	{
		email: {type:String,required: true},
		name: { type: String, required: true },
		content: { type: String, required: true },
		tags: [{ type: String}],
		bans: [{ type: String}],
		date: {type : String},
		date2: {type : String},
		requests : [{type : String}],
		followers : [{type : String}],
		banned : [{type : String}],
		posts: [{type:postSchema,ref: "Post"}]
		
		// moderatormail: {type : String}
	},
	{ collection: 'subgreddit-data' }
)

const Subgreddit = mongoose.model('SubgredditData', Subgredditt)
const Post = mongoose.model("posts", postSchema)

module.exports = {Subgreddit,Post}