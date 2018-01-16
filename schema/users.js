var mongoose = require("mongoose");


//
var schema = new mongoose.Schema({
    username: String,
    password: String,
    isadmin: {
        type: Boolean,
        default: false
    }
})

module.exports = schema;