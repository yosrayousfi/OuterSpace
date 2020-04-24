const express = require("express");
const auth = express.Router();
const passport = require("passport");
auth.get(
  "/login",
  (req, res, next) => {
    res.render("auth/login");
  }
);

auth.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/profile/profile",
    failureRedirect: "/login",
  })
);

auth.get(
  "/signup",
  (req, res, next) => {
    res.render("auth/signup");
  }
);
auth.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/profile/profile",
    failureRedirect: "/signup",
  })
);

auth.get(
  "/auth/github",
  passport.authenticate("github")
);

auth.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: "/profile/profile",
    failureRedirect: "/login",
  })
);
module.exports = auth;
