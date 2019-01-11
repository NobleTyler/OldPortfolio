var express = require("express"),
		app = express(),
 bodyParser = require("body-parser"),
   mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Portfolio", {useNewUrlParser: true});
const port = 3000;
//Schemas
var projectSchema = new mongoose.Schema({
	name: String,
	image: String,
	url: String
});

var Project = mongoose.model("Project",projectSchema);
/*var projectList = [
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
	];*/
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.get("/", function(req,res){
	res.render("landing");
});

app.get("/projects",function(req,res){
	Project.find({},function(err,allProjects){
		if(err)
			console.log("It messed up at retrieving projects.");
		else
			res.render("projects",{projects:allProjects});
			})
});

app.post("/projects", function (req,res) {
	
	var name = req.body.name;
	var image = req.body.image;
	var newProject= {name:name, image:image};
	
	Project.create(newProject,function(err,newlycreated){
		if(err)
			alert("Cant be blank project bud");
		else
			res.redirect("projects");
	})
	res.redirect("/projects");

	//get data from from and add to projectList
	//redirect to projects
});

app.get("/projects/new",function(req,res){
	res.render("new.ejs");
});

//Use for local machine
//app.listen(port, () => console.log(`Portfolio initialized on port ${port}!`));

//Use for cloud9
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Portfolio Server Has Started!");
});