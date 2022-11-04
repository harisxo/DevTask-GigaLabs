const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

// (GET) fethches all user:
router.get("/", (req, res) => {
  User.find({}, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

// (GET) single user: (By ID)
router.get("/:id", (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

// POST(creates a user):
router.post("/", async (req, res) => {
  const user = await new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
  });
  await user.save((err, data) => {
    if (!data) {
      res.status(400).json({ message: "Empty data",err });
    } else {
      res.status(200).json({ message: "User Created successfully", data });
    }
  });
});

//(PATCH) Updates user partially:
router.patch("/:id", (req, res) => {
  const users = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
  };
  User.findByIdAndUpdate(
    req.params.id,
    { $set: users },
    { new: true },
    (err, data) => {
      if (!err) {
        res.status(200).json({
          code: 200,
          message: "User Updated successfully",
          updateUser: data,
        });
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
