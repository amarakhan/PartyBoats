var mongoose = require("mongoose");

var boatSchema = new mongoose.Schema({
    name: String,
    image: String,
    details: String
});

module.exports = mongoose.model("Boats", boatSchema);