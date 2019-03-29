const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const port = 3000;

mongoose.connect("mongodb://localhost/partyboatdb");

app.use(express.static("public"));
app.use(express.static("public/images"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var boatSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Boats = mongoose.model("Boats", boatSchema);
var newBoats = mongoose.model("newBoats", boatSchema);
// Boats.create({
    // name: "Sea Imp",
    // image: "/images/seaimp.jpg"
    // name: "La Suisse", 
    // image: "/images/suisse.jpg"
    // name: "Color Line", 
    // image: "/images/colorline.jpeg"
    // name: "Taxi boat", 
    // image: "/images/taxi.jpg"
// }, function(err, boat){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("new boat added: ");
//         console.log(boat);
//     }
// });


// var boats = [
//     {name: "Sea Imp", image: "/images/seaimp.jpg"},   
//     {name: "Taxi boat", image: "/images/taxi.jpg"},
//     {name: "La Suisse", image: "/images/suisse.jpg"},
//     {name: "Color Line", image: "/images/colorline.jpeg"}
// ]

app.get("/",function(req,res){
    //res.render("home");
    res.render("home");
});

app.get("/boats", function(req, res){
    Boats.find({}, function(err,allboats){
        if(err){
            console.log(err);
        } else {
            newBoats.find({}, function(err,allnewboats){
                if(err){
                    console.log(err);
                } else {
                    res.render("boats", {newboats: allnewboats, boats: allboats});
                }
            });
            // res.render("boats", {boats: allboats});
        }
    });
});

app.post("/boats", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newBoat = {name: name, image: image}
    // boats.push(newBoat);
    newBoats.create(newBoat, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/boats");
        }
    });
});

app.get("/new", function(req,res){
    res.render("new.ejs");
});


app.listen(port, () => console.log(`Listening on port ${port}!`));