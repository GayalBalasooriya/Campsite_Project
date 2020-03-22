var express = require("express");
var app = express();
var bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")

var campgrounds = [
    {name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTY0W4OItYAO9HerX-Dtxtg0SlHq8kyqtWnbBdseRIeWM9kJSgf"},
    {name: "Granite Hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSi0nefdUYfOEp7WxiyghRkL1PxA2JobjAdyYHi8A4bDU9zWQpN"},
    {name: "Mountain Goat's Rest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTPobV4NI_C_OVJrP97BjBY8Vz2oFDxcCUNcY5hvjnygLLUskqb"}
]

app.get("/", function(req, res) {
    res.render("landing")
})

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds})
})

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    res.redirect("/campgrounds")

});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.listen(3000, function() {
    console.log("The Yelp Camp has started")
})