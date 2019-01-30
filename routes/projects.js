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
router.post("/",isLoggedIn, function (req,res) {
	var name  = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newProject= {name:name, image:image,description:desc, author:author };
	Project.create(newProject,function(err,newlyCreated){
		if(err)
			alert("Cant be blank project bud");
		else{
			console.log(newlyCreated);
			res.redirect("projects");
	}
	})
	res.redirect("/projects");
	//get data from from and add to projectList
	//redirect to projects
});
//new
router.get("/new",isLoggedIn,function(req,res){
	res.render("projects/new");
});
//show
router.get("/:id",function(req, res) {
   //find project with id
   Project.findById(req.params.id).populate("comments").exec(function(err,foundProject){
   	if(err)
   		console.log(err);
   	else
   		res.render("projects/show",{project: foundProject});
   });
   //render show project
});

//middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;

