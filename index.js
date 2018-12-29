var express = require("express");
var app = express();
const port = 3000;
app.set("view engine","ejs");

app.get("/", function(req,res){
	res.render("landing");
});
app.get("/projects",function(req,res){
	var projectList = [
		{name:"SwipOrBut",description:"This was an android app I made to test swipes versus buttons",image:""},
		{name:"FreshBooks",description:"A java backend with a jsp frontend and derby database",image:""},
		{name:"SleepEKoala",description:"This was an android app which set koala based alarms to wake you up",image:"https://www.petmd.com/sites/default/files/Acute-Dog-Diarrhea-47066074.jpg"}
	];
	res.render("projects",{projectList:projectList});
});
app.listen(port, () => console.log(`Portfolio initialized on port ${port}!`));
