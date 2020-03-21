var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v3");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")




// Campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSi0nefdUYfOEp7WxiyghRkL1PxA2JobjAdyYHi8A4bDU9zWQpN",
//         description: "This is a huge granit hill"
//     }, function(err, campground) {
//         if(err) {
//             console.log(err);
//         } 
//         else {
//             console.log("Newly created campground:")
//             console.log(campground);
//         }
//     }
// );



// var campgrounds = [
//     {name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTY0W4OItYAO9HerX-Dtxtg0SlHq8kyqtWnbBdseRIeWM9kJSgf"},
//     {name: "Granite Hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSi0nefdUYfOEp7WxiyghRkL1PxA2JobjAdyYHi8A4bDU9zWQpN"},
//     {name: "Mountain Goat's Rest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTPobV4NI_C_OVJrP97BjBY8Vz2oFDxcCUNcY5hvjnygLLUskqb"}
// ]

app.get("/", function(req, res) {
    res.render("landing")
})

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
    //res.render("campgrounds", {campgrounds: campgrounds})
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds})
        }
    });
});

//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;

    var newCampground = {name: name, image: image, description: description}
    Campground.create(newCampground, function(err, newCampground) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/campgrounds");
        }
    });
    

});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

// SHOW - shows more information about one campground 
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    }); 
});

// COMMENTS ROUTE
app.get("/campgrounds/:id/comments/new", function(req, res) {
    // Find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res) {
    // Lookup campground using ID
    // Create new comment
    // Connect new comment to campground
    // Redirect campground show page
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                }
                else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })

})

app.listen(3000, function() {
    console.log("The Yelp Camp has started")
})