const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
router.get("/logout", (req, res, next) => {
  console.log("lougout rounte found");
  req.logout();
  res.redirect("/");
});
router.get("/posts/details/:id", (req, res) => {
  console.log("enter post details route");
  console.log(req.params.id);
  Post.findById(req.params.id)
    .populate({
      path: "comments",
      model: Comment,
      populate: {
        path: "owner",
        model: User,
      },
    })
    .then((post) => {
      console.log(post);
      res.render("profile/postDetails", { post: post });
    });
});
router.get("/addPost", (req, res, next) => {
  console.log("route found");
  res.render("profile/addPost");
});
router.post("/addPost", (req, res, next) => {
  Post.create({
    image: req.body.image,
    description: req.body.description,
    owner: req.user._id,
  })
    .then((post) => {
      console.log(post);
      res.redirect("/profile/profile");
    })
    .catch((err) => {
      next(err);
    });
});
router.get("/posts/edit/:id", (req, res) => {
  Post.findById(req.params.id)
    .populate("owner")
    .then((post) => {
      res.render("profile/postEdit", { post: post });
    });
});
router.get("/posts/delete/:id", (req, res) => {
  Post.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/profile/profile");
    })
    .catch((err) => {
      next(err);
    });
});
router.post("/editPost/:id", (req, res) => {
  const { image, description } = req.body;
  Post.findByIdAndUpdate(req.params.id, {
    image: image,
    description: description,
  })
    .then((post) => {
      res.redirect("/profile/profile");
    })
    .catch((err) => {
      next(err);
    });
});
router.post("/posts/:id/comment", (req, res) => {
  console.log("enter add comment section");
  console.log("comment", req.body.comment);
  console.log("owner", req.user._id);
  console.log("post id", req.params.id);
  const comment = req.body.comment;
  Comment.create({
    comment: comment,
    owner: req.user._id,
  })
    .then((comment) => {
      console.log("comment created");
      console.log("comment details :", comment);
      return Post.findByIdAndUpdate(
        req.params.id,
        { $push: { comments: comment._id } },
        { new: true }
      )
        .populate({
          path: "comments",
          model: Comment,
          populate: {
            path: "owner",
            model: User,
          },
        })
        .then((post) => {
          console.log("updated post", post);
          res.render("profile/postDetails", { post: post });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/search", (req, res, next) => {
  console.log("enter search get route");
  res.render("search");
});
router.post("/search", (req, res, next) => {
  const searchInput = req.body.searchInput;
  console.log(`req ur body ${searchInput}`, searchInput);
  User.find({ username: { $regex: `${searchInput}`, $options: "gi" } })
    .then((users) => {
      console.log("logged", req.user);
      const otherfriends = users.filter((x) => x.username != req.user.username);
      res.render("search", { users: otherfriends });
      res.render("search", { users: otherfriends });
      //ToDo: display friends list in a popup
      // req.session.friendsList = friendsList;
      // next(null, null, { friendsList: friendsList });
      //res.redirect("profile");
    })
    .catch((err) => console.log(err));
});
//your owen profile
router.get("/profile", (req, res, next) => {
  Post.find({ owner: req.user._id })
    //sort by the most recent post
    .sort({ created_at: -1 })
    .populate({ path: "owner" })
    .then((posts) => {
      console.log("populated", posts);
      res.render("profile/profile", {
        postsList: posts,
        profileOwner: req.user,
        istheLogged: true,
        //ToDo: display friends list in a popup
        //users: req.session.friendsList,
      });
    })
    .catch((err) => {
      next(err);
    });
});
//others profile
router.get("/:id", (req, res, next) => {
  console.log("id selected", req.params.id);
  User.findById(req.params.id)
    .then((user) => {
      console.log("user selected", user);
      Post.find({ owner: req.params.id })
        .populate({ path: "owner" })
        .then((posts) => {
          console.log("posts", posts);
          console.log("owner", user);
          res.render("profile/profile", {
            postsList: posts,
            profileOwner: user,
            istheLogged: false,
          });
        });
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;
