const users = [];

const mongoose = require("mongoose");
const User = require("../models/User");

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project2");

User.insertMany(users)
  .then((documents) => {
    console.log(`Success" ${documents.length} users were added`);
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
