const mongoose=require('mongoose');
mongoose.set('strictQuery', false);

const Schema=mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    detail: String,
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  });

  const Post=mongoose.model('Post',PostSchema);

  module.exports=Post;