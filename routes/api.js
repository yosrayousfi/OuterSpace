const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const fetch = require("node-fetch");

router.get("/api", function (req, res, next) {
  res.render("api");
});
router.get("/rovers", function (req, res, next) {
  res.render("rovers");
});
router.get("/picDay", (req, res, next) => {
  const key = "0SYIny5fcR6ht67mFB6EglpBXGLM1nIeiMzK23pc";
  const url = `https://api.nasa.gov/planetary/apod?api_key=0SYIny5fcR6ht67mFB6EglpBXGLM1nIeiMzK23pc`;
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("pic day data", data);
      res.render("picDay", {
        picDay: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/rovers", (req, res, next) => {
  const { rover, solDan } = req.body;
  console.log("sol", solDan);
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
    "/photos?sol=" +
    solDan +
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
          // console.log("rover data", roverData.photo_manifest);
          // console.log("photos", data.photos);
          res.render("rovers", {
            photos: data.photos.slice(0,3),
            rover: roverData.photo_manifest,
          });
        });
      //const obj = JSON.parse(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/imagesByName", function (req, res, next) {
  res.render("imagesByName");
});
router.post("/imagesByName", (req, res, next) => {
  const searchInput = req.body.searchInput;
  var url = "https://images-api.nasa.gov/search?q=";
  console.log(`req ur body ${searchInput}`, searchInput);
  fetch(url + searchInput)
    .then((response) => response.json())
    .then((data) => {
      console.log("imagesByName", data.collection.items);
      res.render("imagesByName", {
        images: data.collection.items,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/imagesByDate", function (req, res, next) {
  res.render("imagesByDate");
});
router.post("/imagesByDate", (req, res, next) => {
  const date = req.body.date;
  console.log(date);
  const baseUrl = `https://api.nasa.gov/planetary/apod?api_key=Ga9HDISbdbttLKsOwn9EhjTrm10xRl1LmWAhBr4i&date=${date}`;

  fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      res.render("imagesByDate", {
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/astroids", function (req, res, next) {
  res.render("astroides");
});
router.post("/astroides", (req, res, next) => {
  const date = req.body.date;
  console.log("the date is ", date);
  const baseUrl = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=KManh3u5NCHutCo7CzsQ957fZQOfRNBl1wWqOprT`;

  fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      res.render("astroides", {
        data: data.near_earth_objects,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/live", function (req, res, next) {
  res.render("live");
});
module.exports = router;
