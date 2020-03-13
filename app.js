var express = require("express")
var app = express()

app.set("view engine", "ejs")

app.get("/", function(req, res) {
    res.render("landing")
})

app.get("/campgrounds", function(req, res) {
    var campgrounds = [
        {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"},
        {name: "Granite Hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT574j7lIqe5VIbPdF8RvAcBitKcYF0HFeqUa2mspav9oQ4aCCG"},
        {name: "Mountain Goat's Rest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTPobV4NI_C_OVJrP97BjBY8Vz2oFDxcCUNcY5hvjnygLLUskqb"}
    ]
    res.render("campgrounds", {campgrounds: campgrounds})
})

app.listen(3000, function() {
    console.log("The Yelp Camp has started")
})