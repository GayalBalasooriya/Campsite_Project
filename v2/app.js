var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp")

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")


//Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSi0nefdUYfOEp7WxiyghRkL1PxA2JobjAdyYHi8A4bDU9zWQpN"
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

app.get("/campgrounds", function(req, res) {
    //res.render("campgrounds", {campgrounds: campgrounds})
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("campgrounds", {campgrounds: allCampgrounds})
        }
    });
});

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    Campground.create(newCampground, function(err, newCampground) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/campgrounds");
        }
    });
    

});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.listen(3000, function() {
    console.log("The Yelp Camp has started")
})