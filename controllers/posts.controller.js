const postsModel = require("../models/posts.model");
const mongoose=require('mongoose')
module.exports.addPost = async (req, res) => {
  const { title, desc } = req.body;

  const post = new postsModel({
    _id:mongoose.Types.ObjectId(),
    title,
    desc,
    UserID: req.session.userID
  });

 await post.save();
 res.redirect('/home')
};
