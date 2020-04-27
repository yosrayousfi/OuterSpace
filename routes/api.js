const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const fetch = require("node-fetch");

router.get("/rover", function (req, res, next) {
  res.render("api");
});
router.get("/picDay", (req, res, next) => {
    const key = "0SYIny5fcR6ht67mFB6EglpBXGLM1nIeiMzK23pc";
    const url = `https://api.nasa.gov/planetary/apod?api_key=0SYIny5fcR6ht67mFB6EglpBXGLM1nIeiMzK23pc`;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
            console.log("pic day data", data);
            res.render("api", {
              picDay: data
      })
    })
      .catch((err) => {
        console.log(err);
      });
});
router.post("/rover", (req, res, next) => {
  const { rover } = req.body;
  // console.log(rover, cam1, cam2, cam3);
  const rootUrl = "https://api.nasa.gov/planetary/apod";
  const key = "?api_key=sqkvdJXoP8PJpE5rCX9FNdhclO9RyQOzhg07NkVk";


  //Uses today as default date; must be YYYY-MM-DD format
  let date = new Date().toISOString().slice(0, 10);

  const defaultEndpoint = rootUrl + date + key;
  // const url2='https://api.nasa.gov/mars-photos/api/v1/rovers/'+ name.toLowerCase() +'/photos?sol='+ solDan +'&api_key=MnVgZ2xIG46leUz6OEccQR3g5iw3vZD1j2PEJKGe',
  const url2 =
    "https://api.nasa.gov/mars-photos/api/v1/rovers/" +
    rover.toLowerCase() +
    "/photos?sol=1000&api_key=MnVgZ2xIG46leUz6OEccQR3g5iw3vZD1j2PEJKGe";
  //this url jst info about the rover
  const url =
    "https://api.nasa.gov/mars-photos/api/v1/manifests/" +
    rover.toLowerCase() +
    "?api_key=MnVgZ2xIG46leUz6OEccQR3g5iw3vZD1j2PEJKGe";
  console.log(url2);
  fetch(url2)
    .then((response) => response.json())
    .then((data) => {
      fetch(url)
        .then((response) => response.json())
        .then((roverData) => {
          console.log("rover data", roverData.photo_manifest);
          // console.log("photos", data.photos);
          res.render("api", {
            photos: data.photos,
            rover: roverData.photo_manifest,
          });
        });
      //const obj = JSON.parse(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
