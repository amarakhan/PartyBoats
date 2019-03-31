const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Boats = require("./models/boats");
const newBoats = require("./models/newBoats");
const seedDB = require("./seeds");

const app = express();
const port = process.env.PORT || 3000;

seedDB();

mongoose.connect("mongodb://localhost/partyboatdb");

app.use(express.static("public"));
app.use(express.static("public/images"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


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
    var details = req.body.details;
    var newBoat = {name: name, image: image, details:details}
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

app.get("/boats/:id", function(req,res){
    Boats.findById(req.params.id, function(err, foundBoat){
        if(err){
            console.log(err);
        }else{
            res.render("showboats", {boat: foundBoat});
        }
    });
});


app.get("/hostedboats/:id", function(req,res){
    newBoats.findById(req.params.id, function(err, foundBoat){
        if(err){
            console.log(err);
        }else{
            res.render("showhostedboats", {boat: foundBoat});
        }
    });
});


app.listen(port, () => console.log(`Listening on port ${port}!`));