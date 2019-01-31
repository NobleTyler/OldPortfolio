var express = require("express");
var router = express.Router();
var Project = require("../models/project");
var middleware = require("../middleware");
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
router.post("/",middleware.isLoggedIn, function (req,res) {
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
router.get("/new",middleware.isLoggedIn,function(req,res){
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



//Edit Project Route
router.get('/:id/edit',middleware.checkProjectOwnership,function(req,res){

	Project.findById(req.params.id,function(err,foundProject){
		res.render("projects/edit",{project:foundProject});
		});
	});

router.put("/:id",middleware.checkProjectOwnership,function(req,res){
	//find and update campground by id
	Project.findByIdAndUpdate(req.params.id,req.body.project,function(err,updatedProject){
		if(err)
		res.redirect("/projects");
		else{
		res.redirect("/projects/" + req.params.id);
		}
		});
	});
//Destroy Project Route
router.delete("/:id",middleware.checkProjectOwnership,function(req,res){
	Project.findByIdAndRemove(req.params.id,function(err,updatedProject){
		if(err)
		res.redirect("/projects");
		else{
		res.redirect("/projects/" + req.params.id);
		}
		});
	});

module.exports = router;

