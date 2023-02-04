const express = require("express");
const ejs = require("ejs");
const path = require("path");
const methodOverride = require("method-override");
const Post = require("./models/Post");
const mongoose = require("mongoose");
const postControllers = require("./controllers/postControllers");
const pageControllers = require("./controllers/pageControllers");
const { assert } = require("console");
mongoose.set("strictQuery", false);

const app = express();
//connect DB
mongoose.connect("mongodb://127.0.0.1:27017/cleanBlog");
//template engine
app.set("view engine", "ejs");
//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);
//routes
app.get("/about", pageControllers.getAboutPage);
app.get("/add_post", pageControllers.getAddPostPage);
app.get("/post/edit/:id", pageControllers.getEditPage);
app.get("/", postControllers.getAllPosts);
app.get("/post/:id", postControllers.getPost);
app.post("/add_post", postControllers.createPost);
app.put("/post/:id", postControllers.updatePost);
app.delete("/post/:id", postControllers.deletePost);

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
