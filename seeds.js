var mongoose = require("mongoose");
var Boats = require("./models/boats");
var newBoats = require("./models/newboats");
var Comment = require("./models/comment");

var boatData = [
    { 
        name: "Sea Imp", 
        image: "/images/seaimp.jpg",
        details: "Scuppers barkadeer main sheet ballast hulk. Clipper cog carouser no prey, no pay snow. Lad tack booty Brethren of the Coast mutiny."
    },
    {   name: "La Suisse", 
        image: "/images/suisse.jpg",
        details: "Sail ho Corsair carouser haul wind maroon spanker deadlights. Belay lugger carouser tender pinnace grapple keelhaul. Coffer walk the plank wench brigantine snow skysail fluke. Aye Pirate Round code of conduct line schooner pressgang wherry."
    },
    {   
        name: "Color Line", 
        image: "/images/colorline.jpeg",
        details: "Scallywag black jack yard port Shiver me timbers. Ye Cat o'nine tails gabion hail-shot clipper."
    },
    {
        name: "Taxi boat", 
        image: "/images/taxi.jpg",
        details: "Long boat tack yard lugsail gabion nipper handsomely scourge of the seven seas Chain Shot. Furl me Admiral of the Black brig jib red ensign squiffy Barbary Coast lee. Landlubber or just lubber chase topgallant hands belay driver pressgang coxswain Corsair."
    }
]

var newBoatData = [
    {
        name:"I'm the captain now, Tom Hanks!",
        image:"/images/indo-boat.jpeg",
        details: "Wench Corsair pink lugsail scuppers. Dead men tell no tales six pounders Privateer Plate Fleet Gold Road. Measured fer yer chains Cat o'nine tails grog blossom cog to go on account."
    },
    {
        name:"Arrrr matey. Come sail with us!",
        image:"/images/littleboat.jpeg",
        details: "Corsair crimp gaff hulk Blimey log. Strike colors topgallant weigh anchor topsail aft jib."
    }
]

function seedDB(){
    Boats.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            newBoats.remove({}, function(err){
                if(err){
                    console.log(err);
                }else{
                    boatData.forEach(function(seed){
                        Boats.create(seed, function(err,boat){
                            if(err){
                                console.log(err);
                            }else{
                                // console.log("added a boat!")
                                Comment.create(
                                    {
                                        text: "Was a great Vessel.. will comandeer again!",
                                        author: "Captain Arrr"
                                    },function(err, comment){
                                        if(err){
                                            console.log(err);
                                        } else {
                                            boat.comments.push(comment);
                                            boat.save();
                                            // console.log("Created comment");
                                        }
                                });
                            }
                        });
                    });
                    newBoatData.forEach(function(seed){
                        newBoats.create(seed, function(err,boat){
                            if(err){
                                console.log(err);
                            }else{
                                // console.log("added a boat!")
                                Comment.create(
                                    {
                                        text: "Was a great Vessel.. will comandeer again!",
                                        author: "Captain Arrr"
                                    },function(err, comment){
                                        if(err){
                                            console.log(err);
                                        } else {
                                            boat.comments.push(comment);
                                            boat.save();
                                            // console.log("Created comment");
                                        }
                                });
                            }
                        });
                    });
                }
            });
        }
    });
}

seedDB();
