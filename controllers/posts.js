const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post"); //use the Post model to talk to db

module.exports = {
  getProfile: async (req, res) => { //load the profile page
    try {
      const posts = await Post.find({ user: req.user.id }); //find the user ID in the DB using the Post model
      res.render("profile.ejs", { posts: posts, user: req.user }); //render the projile ejs file and use the data of post for the object
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => { //load the feed page
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean(); //use the Post model to find and all the posts and sort them in descending order
      res.render("feed.ejs", { posts: posts }); //render the feed ejs file and drop the sorted posts data using the posts variable
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
