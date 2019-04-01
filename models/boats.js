var mongoose = require("mongoose");

var boatSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Boats", boatSchema);