var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
	res.render("landing");
});

app.get("/index", function (req, res) {
	Campground.find({}, function (err, campgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("index", { campgrounds: campgrounds });
		}
	});
});

app.get("/campgrounds/new", function (req, res) {
	res.render("new");
});
app.get("/campgrounds/:id", function (req, res) {
	res.render("show");
});
app.post("/index", function (req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = { name: name, image: image };
	Campground.create(newCampground, function (err, newOne) {
		if (err) {
			console.log(err);
		} else {
			console.log(newOne);
		}
	});
	res.redirect("/index");
});

process.env.PORT = 5000;
app.listen(process.env.PORT, process.env.IP, function () {
	console.log("The YelpCamp Server has started");
});
