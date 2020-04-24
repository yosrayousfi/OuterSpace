const bcrypt = require("bcrypt");

// const salt = bcrypt.genSaltSync();

const salt = bcrypt.genSaltSync();
console.log(salt);
const hash = bcrypt.hashSync("hello", salt);

console.log(hash);
