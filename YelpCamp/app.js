var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seed");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});
// seedDB();

app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// ==============================
// CAMPGORUND ROUTES
// ==============================

app.get("/", function (req, res) {
	res.render("landing");
});

app.get("/index", function (req, res) {
	Campground.find({}, function (err, campgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", { campgrounds: campgrounds });
		}
	});
});

app.get("/campgrounds/new", function (req, res) {
	res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function (req, res) {
	Campground.findById(req.params.id)
		.populate("comments")
		.exec(function (err, foundCampground) {
			if (err) {
				console.log(err);
			} else {
				console.log(foundCampground);
				res.render("campgrounds/show", { campground: foundCampground });
			}
		});
});

app.post("/campgrounds", function (req, res) {
	var name = req.body.name;
	var description = req.body.description;
	var image = req.body.image;
	var newCampground = { name: name, description: description, image: image };
	Campground.create(newCampground, function (err, newOne) {
		if (err) {
			console.log(err);
		} else {
			console.log(newOne);
		}
	});
	res.redirect("/index");
});

// ==============================
// COMMENT ROUTES
// ==============================

app.get("/campgrounds/:id/comments/new", function (req, res) {
	Campground.findById(req.params.id, function (err, campground) {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", { campground: campground });
		}
	});
});

app.post("/campgrounds/:id/comments", function (req, res) {
	Campground.findById(req.params.id, function (err, campground) {
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function (err, comment) {
				if (err) {
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

process.env.PORT = 5000;
app.listen(process.env.PORT, process.env.IP, function () {
	console.log("The YelpCamp Server has started");
});
