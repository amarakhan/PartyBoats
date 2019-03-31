var mongoose = require("mongoose");

var newboatSchema = new mongoose.Schema({
    name: String,
    image: String,
    details: String
});

module.exports = mongoose.model("newBoats", newboatSchema);