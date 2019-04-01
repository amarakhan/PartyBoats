const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");

const Boats = require("./models/boats");
const newBoats = require("./models/newBoats");
const Comment = require("./models/comment");
const User = require("./models/user");

const seedDB = require("./seeds");

const app = express();
const port = process.env.PORT || 3000;

// configuring passport
app.use(require("express-session")({
    secret: "What did the ocean say to the pirate? Nothing, it just waved.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb://localhost/partyboatdb");

app.use(express.static("public"));
app.use(express.static("public/images"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

seedDB();

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
    Boats.findById(req.params.id).populate("comments").exec(function(err, foundBoat){
        if(err){
            console.log(err);
        }else{
            console.log(foundBoat);
            res.render("showboats", {boat: foundBoat});
        }
    });
});


app.get("/hostedboats/:id", function(req,res){
    newBoats.findById(req.params.id).populate("comments").exec(function(err, foundBoat){
        if(err){
            console.log(err);
        }else{
            console.log(foundBoat);
            res.render("showhostedboats", {boat: foundBoat});
        }
    });
});

app.get("/boats/:id/comments/new", function(req,res){
    Boats.findById(req.params.id, function(err, boat){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{boat:boat});
        }
    });
});

app.get("/hostedboats/:id/comments/new", function(req,res){
    newBoats.findById(req.params.id, function(err,boat){
        if(err){
            console.log(err);
        }else{
            res.render("comments/eventnew",{boat:boat});
        }
    });
});

app.post("/boats/:id/comments", function(req,res){
    Boats.findById(req.params.id, function(err,boat){
        if(err){
            console.log(err);
            res.redirect("/boats");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    boat.comments.push(comment);
                    boat.save();
                    res.redirect("/boats/"+boat._id);
                }
            });
        }
    });
});

app.post("/hostedboats/:id/comments", function(req,res){
    Boats.findById(req.params.id, function(err,boat){
        if(err){
            console.log(err);
            res.redirect("/boats");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    boat.comments.push(comment);
                    boat.save();
                    res.redirect("/boats/"+boat._id);
                }
            });
        }
    });
});


app.listen(port, () => console.log(`Listening on port ${port}!`));