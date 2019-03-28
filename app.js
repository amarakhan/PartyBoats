const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.static("public/images"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var boats = [
    {name: "party boat 1 - taxi boat", image: "/images/party1.jpg"},
    {name: "Stena Line", image: "/images/suisse.jpg"},
    {name: "Color Line", image: "/images/colorline.jpeg"}
]

app.get("/",function(req,res){
    //res.render("home");
    res.render("home");
});

app.get("/boats", function(req, res){

    res.render("boats", {boats: boats});
});

app.post("/boats", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newBoat = {name: name, image: image}
    boats.push(newBoat);
    res.redirect("/boats");
});

app.get("/boats/new", function(req,res){
    res.render("new.ejs");
});


app.listen(port, () => console.log(`Listening on port ${port}!`));