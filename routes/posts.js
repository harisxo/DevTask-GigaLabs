const express = require("express");
const router = express.Router();
const { Post } = require("../models/post");

// (GET) Single POST: (By ID)
router.get("/", async (req, res) => {
  try {
    let posts = [];
    posts = await Post.find({}).populate("user");
    return res.status(200).json({
      status: true,
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// Return posts for a user
router.get("/", async (req, res) => {
  try {
    const userID = req.params.userId;
    let posts = [];
    posts = await Post.find({ user: userID }).populate("user");
    return res.status(200).json({
      status: true,
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// // Gets a single post
router.get("/:id", (req, res) => {
  Post.findById(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

// (POST) Adds a new post:
router.post("/",async (req, res) => {
  const { body: { title, content, user },} = req;
  const post = await new Post({
    title: title,
    content: content,
    user: user,
  });
  await post.save((err, data) => {
    if(!data){
        res.status(400).json({ message: "Invalid data entered",err });
    } else {
        res.status(200).json({code: 200, message: "Post Added successfully", addPost: data,});
    }
    
  });
});

// (PATCH) Adds a subset of fields ():
router.patch("/:id", (req, res) => {
  const posts = {
    title: req.body.title,
    content: req.body.content
  };
  Post.findByIdAndUpdate(
    req.params.id,
    { $set: posts },
    { new: true },
    (err, data) => {
      if (!err) {
        res
          .status(200)
          .json({
            code: 200,
            message: "Post edited successfully",
            updatePost: data,
          });
      } else {
        console.log(err);
      }
    }
  );
});
module.exports = router;
