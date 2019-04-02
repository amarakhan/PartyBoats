// schema for booking boats
var mongoose = require("mongoose");

var bookingSchema = mongoose.Schema({
    startDate: String,
    endDate: String,
    boat: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Boats"
        }
    ],
    startPort: String,
    destPort: String
});