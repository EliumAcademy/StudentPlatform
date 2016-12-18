const mongoose      = require('mongoose');
const mongolabUrl   = require("./evn.json").db

mongoose.Promise = Promise; // set mongo promises to global promise
mongoose.connect(mongolabUrl);



