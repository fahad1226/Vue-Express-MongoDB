const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const Post = require("../models/post");
const app = express()


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/vue_express');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});


app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


//router get
// app.get('/posts', (req,res) => { 
// 	res.send(
// 		[{
// 			title: "Hello World",
// 			description: "Hello Vue & Express"
// 		}]
// 	)
// });


//router post
app.post('/posts',(req,res) => {
	var db = req.db;
	var title = req.body.title;
	var description = req.body.description;

	var new_post = new Post({
		title: title,
		description: description
	});

	new_post.save(function(error){
		if (error) {
			console.log(error);
		}
		res.send({
			success: true,
      		message: 'Post saved successfully!'
		})
	})

});



//get all posts


app.get('/get_posts', (req, res) => {
  Post.find({}, 'title description', function (error, posts) {
    if (error) { console.error(error); }
    res.send({
      posts: posts
    })
  }).sort({_id:-1})
})


port = process.env.PORT || 8081
app.listen(port, () => {
	console.log(`server started on port ${port}`);
})