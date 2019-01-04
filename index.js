var express = require("express");
var app = express();
const port = 3000;
var bodyParser= require("body-parser");
var projectList = [
		{name:"SwipOrBut",description:"This was an android app I made to test swipes versus buttons",image:""},
		{name:"FreshBooks",description:"A java backend with a jsp frontend and derby database",image:""},
		{name:"SleepEKoala",description:"This was an android app which set koala based alarms to wake you up",image:"https://www.petmd.com/sites/default/files/Acute-Dog-Diarrhea-47066074.jpg"}
		,{name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
	];
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.get("/", function(req,res){
	res.render("landing");
});

app.get("/projects",function(req,res){
	
	res.render("projects",{projectList:projectList});
});

app.post("/projects", function (req,res) {
	
	var name = req.body.name;
	var image = req.body.image;
	var newProject= {name:name, image:image};
	projectList.push(newProject);
	res.redirect("/projects");

	//get data from from and add to projectList
	//redirect to projects
});

app.get("/projects/new",function(req,res){
	res.render("new.ejs");
})

app.listen(port, () => console.log(`Portfolio initialized on port ${port}!`));
