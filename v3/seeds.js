var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Clouds Rest",
        image: "https://images.unsplash.com/photo-1569817480337-01a8b22cd8d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", 
        description: "Hello this is me"
    },
    {
        name: "Desert Mesa",
        image: "https://images.unsplash.com/photo-1503264116251-35a269479413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", 
        description: "Hello this is me"
    },
    {
        name: "Haaya Boosa",
        image: "https://images.unsplash.com/photo-1496768050990-568b4d02ec18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", 
        description: "Hello this is me"
    },
]

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        
        console.log("Campgrounds are removed");
        // Add a few campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log("Added a campground");
                    // Create a comment
                    Comment.create({
                        text: "This is awesome",
                        author: "Homer"
                    }, function(err, comment) {
                        if(err) {
                            console.log(err);
                        }
                        else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comments");
                        }
                    });
                }
            });
        });
    });

    

    // Add a few comments
}

module.exports = seedDB;
