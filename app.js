var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const hbs = require("hbs");
require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const User = require("./models/user");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GithubStrategy = require("passport-github").Strategy;
const flash = require("connect-flash");
const bcrypt = require("bcrypt");
var index = require("./routes/index");
var auth = require("./routes/auth");
var profile = require("./routes/profile");
var api = require("./routes/api");
// var users = require("./routes/users");
var app = express();
const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 * 1000,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", index);
app.use("/", auth);
app.use("/profile", profile);
app.use("/api", api);
// app.use("/users", users);
mongoose
  .connect("mongodb://localhost/project2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));
passport.serializeUser((user, next) => {
  next(null, user._id);
});
passport.deserializeUser((id, next) => {
  User.findById(id)
    .then((user) => next(null, user))
    .catch((err) => next(err));
});
passport.use(
  "local-signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, next) => {
      console.log("enter local-signup");
      process.nextTick(() => {
        console.log("enter user find one in db");
        User.findOne(
          {
            username: username,
          },
          (err, user) => {
            if (err) {
              console.log("error", err);
              return next(err);
            }
            if (user) {
              console.log("user exists");
              return next(null, false);
            } else {
              const { username, email, description, password } = req.body;
              const hashPass = bcrypt.hashSync(
                password,
                bcrypt.genSaltSync(10),
                null
              );
              const user = new User({
                username,
                email,
                password: hashPass,
              });
              user.save((err) => {
                if (err) {
                  next(err);
                }
                console.log("user created");
                return next(null, user);
              });
            }
          }
        );
      });
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy((username, password, next) => {
    console.log("enter local-login");
    User.findOne({ username }, (err, user) => {
      console.log("enter user find one in db");
      if (err) {
        console.log("found error", err);
        return next(err);
      }
      if (!user) {
        console.log("error user does not exixt");
        return next(null, false, { message: "Incorrect username" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        console.log("error wrong password");
        return next(null, false, { message: "Incorrect password" });
      }
      console.log("user is ", user);
      console.log("everything ok");
      return next(null, user);
    });
  })
);

passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: "http://127.0.0.1:3000/auth/github/callback",
    },
    (accessToken, refreshToken, profile, next) => {
      console.log("enter strategyyyyyyyyyyyyyyyyyyyyyyyyyy");
      User.findOne({ githubId: profile.id })
        .then((found) => {
          if (found !== null) {
            console.log("git exist");
            next(null, found);
          } else {
            console.log("new git");
            console.log("username ", profile.name);
            console.log("usgithubIdername ", profile.id);
            const user = new User({
              username: profile.displayName,
              githubId: profile.id,
            });
            return user.save((err) => {
              if (err) {
                next(err);
              }
              console.log("user created");
              return next(null, user);
            });
          }
        })
        .catch((err) => {
          next(err);
        });
    }
  )
);
module.exports = app;
