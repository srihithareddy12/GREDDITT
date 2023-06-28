const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const {Subgreddit ,Post}= require('./models/subgreddit.model')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://GREDDIT:greddit@cluster0.onw7tyt.mongodb.net/test')

app.post('/api/register',async(req,res) => {
    try {
		await User.create({
            fname: req.body.fname,
			lname: req.body.lname,
			uname: req.body.uname,
			contact: req.body.contact,
			age: req.body.age,
			email: req.body.email,
			password: req.body.password,
		})
		res.json({ status: 'ok' })
	} catch (err) {
        console.log(err)
		res.json({ status: 'error', error: 'Duplicate email' })
	}
}
)
app.post('/api/login', async (req, res) => {

	const user = await User.findOne({
		email: req.body.email,
        password : req.body.password,
	})
	if (user) {
		const token = jwt.sign(
			{
				// name: user.name,
				email: user.email,
			},
			'secret123'
		)

		res.json({ status: 'ok', user: token , userinfo: user})
	} else {
		return res.json({ status: 'error', user: false })
	}
})


app.post('/api/profile', async (req, res) => {

	console.log(req.body)
	
		const user = await User.findOne({
			email: req.body.email,
		})
			return res.json({ userinfo: user})
		})


app.post('/api/editprofile',async(req, res) => {

	let updateuser = await User.findOneAndUpdate({email: req.body.email},
		{fname : req.body.fname, lname : req.body.lname,age : req.body.age, contact: req.body.contact},
		{new : true})
	 return res.json({ userinfo: updateuser})
})

app.post('/api/removefollow',async(req,res) => {
	var x = ''
	if(req.body.ff === 'followers') x = "followers"
	else x = "following"

	console.log([x])
	console.log(req.body)

	try {
		const user2 = await User.findOneAndUpdate(
			{email : req.body.email},
			{$pull: {[x]: req.body.specificcp }},
		    { new: true }
		);
	
		console.log('pppppp')

		console.log(user2)
		if (!user2) {
		  return res.status(404).json({ message: 'User not found' });
		}

		res.json(user2);
	  } catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	  }
})

app.post('/api/subgreddit',async(req,res) => {
	const now = new Date();
        const year = now.getFullYear();
        const month = ('0' + (now.getMonth() + 1)).slice(-2);
        const day = ('0' + now.getDate()).slice(-2);
        const hours = ('0' + now.getHours()).slice(-2);
        const minutes = ('0' + now.getMinutes()).slice(-2);
        const seconds = ('0' + now.getSeconds()).slice(-2);
        const formatted = `${year}${month}${day}${hours}${minutes}${seconds}`;
        const formattedtime = `On ${year}-${month}-${day} At(${hours}:${minutes}:${seconds})`;

    try {
		
        
		await Subgreddit.create({
			email: req.body.email,
            name: req.body.name,
			content: req.body.content,
			tags: req.body.tags,
			bans: req.body.bans,
			date: formattedtime,
			date2: formatted,
		})
		res.json({ status: 'ok' })
	} catch (err) {
        console.log(err)
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/subgredditlist',async(req,res) => {
	const tags=[]
	Subgreddit.find({email: req.body.email}).then(function(subgreddits){
		res.send(subgreddits)
	})
})

app.post('/api/subgredditusers',async(req,res) => {
	Subgreddit.find({name: req.body.postname}).then(function(subgreddits){
		res.send(subgreddits)
	})
})

app.post('/api/subgredditrequests',async(req,res) => {
	Subgreddit.find({name: req.body.postname}).then(function(subgreddits){
		res.send(subgreddits)
	})

})

app.post('/api/subgredditaccrequests',async(req,res) => {
	try {
		const Subgreddit2 = await Subgreddit.findOneAndUpdate(
			{name : req.body.postname2},
			{$push: {followers : req.body.requester},$pull: { requests: req.body.requester }},
		    { new: true }
		);
	
		console.log('pppppp')
		if (!Subgreddit2) {
		  return res.status(404).json({ message: 'User not found' });
		}
		res.json(Subgreddit2);
	  } catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	  }
})

app.post('/api/subgredditdelrequests',async(req,res) => {
	console.log('olap')
	try {
		const Subgreddit2 = await Subgreddit.findOneAndUpdate(
			{name : req.body.postname2},
			{$pull: { requests: req.body.requester }},
		    { new: true }
		);
	
		console.log('pppppp')

		console.log(Subgreddit2)
		if (!Subgreddit2) {
		  return res.status(404).json({ message: 'User not found' });
		}
		res.json(Subgreddit2);
	  } catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	  }
})

app.post('/api/subgredditdel',async(req,res) => {
	
	Subgreddit.deleteOne({ email: req.body.email ,name: req.body.tagg }, function(err) {
		if (!err) {
				console.log("done")
				res.json({ status: 'ok' })
				
		}
		else {
				console.log(err)
		}
	})
})

app.post('/api/allgreddit',async(req,res) => {

	const now = new Date();
        const year = now.getFullYear();
        const month = ('0' + (now.getMonth() + 1)).slice(-2);
        const day = ('0' + now.getDate()).slice(-2);
        const hours = ('0' + now.getHours()).slice(-2);
        const minutes = ('0' + now.getMinutes()).slice(-2);
        const seconds = ('0' + now.getSeconds()).slice(-2);
        const formatted = `${year}${month}${day}${hours}${minutes}${seconds}`;
        const formattedtime = `On ${year}-${month}-${day} At(${hours}:${minutes}:${seconds})`;
    
	try {
		await Subgreddit.create({
			email: req.body.email,
            name: req.body.name,
			content: req.body.content,
			tags: req.body.tags,
			bans: req.body.bans,
			date: formattedtime,
			date2: formatted,
		})
		// console.log(Subgreddit)
		res.json({ status: 'ok' })
	} catch (err) {
        console.log(err)
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/allgredditlist',async(req,res) => {
	Subgreddit.find({email:req.body.email}).then(function(subgreddits){
		// console.log(subgreddits)
		res.send(subgreddits)
	})
})

app.post('/api/allgredditlist2',async(req,res) => {
	Subgreddit.find({email: { $ne: req.body.email}}).then(function(subgreddits){
		
		console.log(subgreddits)
			res.send(subgreddits)
			

	})
})

app.post('/allgredditlist3',async(req,res) => {
	Subgreddit.find({
		email: { $ne: req.body.email},
		followers: {$in : [req.body.email]}
	}).then(function(subgreddits){	
		console.log("-------------")
		console.log(subgreddits)
			res.send(subgreddits)
	})
})


app.post('/api/allgredditleave',async(req,res) => {

	// console.log(req.body.tagg)
	// console.log(req.body.email)
	
	Subgreddit.deleteOne({ email: req.body.email ,name: req.body.tagg }, function(err) {
		if (!err) {
				console.log("done")
				// message.type = 'notification!';
				res.json({ status: 'ok' })
				
		}
		else {
				// message.type = 'error';
				console.log(err)
		}
	})
})

app.post('/api/allgredditjoin',async(req,res) => {
	console.log(req.body)
	try {
		const Subgreddit2 = await Subgreddit.findOneAndUpdate(
			{name : req.body.postname},
			{$push: {requests : req.body.email}},
		    { new: true }
		);
	
		console.log('p')

		console.log(Subgreddit2)
		if (!Subgreddit2) {
		  return res.status(404).json({ message: 'User not found' });
		}
		console.log(Subgreddit2)
		res.json(Subgreddit2);
	  } catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	  }
	
	
})

app.post('/api/allgredditpostpage',async(req,res) => {
	console.log(req.body)
	Subgreddit.find({name: req.body.name}).then(function(subgreddits){	
		// console.log('-----------------------------------------------')
		console.log(subgreddits)
			res.send({ y: subgreddits})

	})
})


app.post('/api/allgredditaddpost',async(req,res) => {
	const newPost = new Post({
		content : req.body.postcontent,
		user : req.body.emailx,
		gredditname : req.body.x,
	})

    newPost.save((err, post) => {
        if (err) {
            console.log(err)
        }
        else {
			console.log(post)
			console.log(req.body.x)
           
                if (err) {
                    console.log(err)
                }
                else {    
                res.send({ status: "OK", info: post })                  
                }        
        }
    })
})

app.post('/api/allgredditpostlist',async(req,res) => {
	console.log(req.body)
	Post.find({gredditname: req.body.name}).then(function(posts){	
		console.log(posts)
			res.send(posts)
	})
})



app.post('/api/allgredditaddcomment',async(req,res) => {
	console.log(req.body)
	try {
		const Post2 = await Post.findOneAndUpdate(
			{content : req.body.comtemp},
			{$push: {comments : req.body.comcontent}},
		    { new: true }
		);
		if (!Post2) {
		  return res.status(404).json({ message: 'User not found' });}
		console.log(Post2)
		res.json(Post2);}
		 catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' }); }
})

app.post('/api/allgredditupVote',async(req,res) => {
	// console.log(req.body)
	try {
		const Post2 = await Post.findOneAndUpdate(
			{content : req.body.postnamee},
			{$push: {upvotes : req.body.emailx}},
		    { new: true }
		);
		if (!Post2) {
		  return res.status(404).json({ message: 'User not found' });}
		console.log(Post2)
		res.json(Post2);}
		 catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' }); }
})

app.post('/api/allgredditdownVote',async(req,res) => {
	// console.log(req.body)
	try {
		const Post2 = await Post.findOneAndUpdate(
			{content : req.body.postnamee},
			{$push: {downvotes : req.body.emailx}},
		    { new: true }
		);
		if (!Post2) {
		  return res.status(404).json({ message: 'User not found' });}
		console.log(Post2)
		res.json(Post2);}
		 catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' }); }
})

app.post('/api/allgredditsaveposts',async(req,res) => {
	// console.log(req.body)
	try {
		const Post2 = await Post.findOneAndUpdate(
			{content : req.body.postnamee},
			{$push: {savedposts : req.body.emailx}},
		    { new: true }	
		);
		if (!Post2) {
		  return res.status(404).json({ message: 'User not found' });}
		console.log(Post2)
		res.json(Post2);}
		 catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' }); }
})


app.post('/api/showsaveposts',async(req,res) => {
	// console.log('------------------------++++++++++++++++++++++')
	console.log(req.body)
	try {
		const Post2 = await Post.find({ savedposts: { $in: [req.body.email] }}	);
		if (!Post2) {
		  return res.status(404).json({ message: 'User not found' });}
		console.log(Post2)
		res.json(Post2);
	}
		 catch (error) {
			console.log('opppppp')
		console.error(error);
		res.status(500).json({ message: 'Server error' }); }
})


app.post('/api/unsavepost',async(req,res) => {
	console.log(req.body)

	Post.updateMany({ content: req.body.postcontent},{$pullAll : {savedposts: req.body.email}}, function(err) {
		if (!err) {
				console.log("doneeee")
				res.json({ status: 'ok' })}
		else    {console.log(err)}
	})
})



app.listen(5000,() => {
    console.log('server started on 5000')
})