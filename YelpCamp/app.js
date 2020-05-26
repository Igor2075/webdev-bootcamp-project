var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var campgrounds = [
	{
		name: "Salmon Creek",
		image:
			"https://www.photosforclass.com/download/pixabay-4522970?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7c2f78dc9448c05d_1280.jpg&user=Ben_Frieden",
	},
	{
		name: "Granite Hill",
		image:
			"https://www.photosforclass.com/download/pixabay-3893587?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F55e8dc404f5aab14f6da8c7dda793f7f1636dfe2564c704c7c2f78dc9448c05d_1280.jpg&user=FabricioMacedoPhotos",
	},
	{
		name: "Mountain View",
		image:
			"https://www.photosforclass.com/download/pixabay-1851092?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c7c2f78dc9448c05d_1280.jpg&user=Pexels",
	},
];

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
	res.render("landing");
});

app.get("/campgrounds", function (req, res) {
	res.render("campgrounds", { campgrounds: campgrounds });
});

app.get("/campgrounds/new", function (req, res) {
	res.render("new");
});
app.post("/campgrounds", function (req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = { name: name, image: image };
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

process.env.PORT = 5000;
app.listen(process.env.PORT, process.env.IP, function () {
	console.log("The YelpCamp Server has started");
});
