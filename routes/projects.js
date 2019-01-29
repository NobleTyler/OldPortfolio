var express = require("express");
var router = express.Router();
var Project = require("../models/project");
//index
router.get("/",function(req,res){
	
	Project.find({},function(err,allProjects){
		if(err)
			console.log("It messed up at retrieving projects.");
		else
			res.render("projects/index",{projects:allProjects});
			})
});
//create
router.post("/", function (req,res) {
	
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
//new
router.get("/new",function(req,res){
	res.render("projects/new");
});
//show
router.get("/:id",function(req, res) {
   //find project with id
   Project.findById(req.params.id).populate("comments").exec(function(err,foundProject){
   	if(err)
   		console.log("project find didnt work");
   	else
   		res.render("projects/show",{project: foundProject});
   });
   //render show project
});
module.exports = router;

