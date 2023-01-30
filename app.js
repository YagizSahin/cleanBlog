const express = require("express");
const ejs = require("ejs");
const path = require("path");
const Post= require('./models/Post');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const app = express();
//connect DB
mongoose.connect('mongodb://127.0.0.1:27017/cleanBlog');
//template engine
app.set("view engine", "ejs");
//middleware
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//routes
app.get("/", async (req, res) => {
  const posts=await Post.find({})
  res.render("index",{
    posts
  });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/add_post", (req, res) => {
  res.render("add_post");
});
app.get('/post/:id', async (req, res) => {
  const post= await Post.findById(req.params.id);
  res.render('post',{
    post
  })
});
app.post('/add_post', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
