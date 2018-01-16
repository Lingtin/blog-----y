var mongoose = require("mongoose");

var categorySchema = require("./../schema/category");

module.exports = mongoose.model("category", categorySchema)