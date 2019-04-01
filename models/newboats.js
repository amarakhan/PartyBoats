var mongoose = require("mongoose");

var newboatSchema = new mongoose.Schema({
    name: String,
    image: String,
    details: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("newBoats", newboatSchema);