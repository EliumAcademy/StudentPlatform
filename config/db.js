const mongoose      = require('mongoose');
const mongolabUrl   = process.env.mongolabUrl;

mongoose.Promise = Promise; // set mongo promises to global promise
mongoose.connect(mongolabUrl);
