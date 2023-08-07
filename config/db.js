const mongoose = require("mongoose");
require("dotenv").config()


const connection = mongoose.connect("mongodb+srv://tripathihariom34:fdcvKTacjdOxURap@cluster0.yjmosc6.mongodb.net/olx_classifieds");
module.exports = { connection };