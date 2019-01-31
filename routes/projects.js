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

//Edit Project Route
router.get('/:id/edit',checkProjectOwnership,function(req,res){
	
	Project.findById(req.params.id,function(err,foundProject){
		res.render("projects/edit",{project:foundProject});
		});
	});

router.put("/:id",checkProjectOwnership,function(req,res){
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
router.delete("/:id",checkProjectOwnership,function(req,res){
	Project.findByIdAndRemove(req.params.id,function(err,updatedProject){
		if(err)
		res.redirect("/projects");
		else{
		res.redirect("/projects/" + req.params.id);
		}
		});
	});
function checkProjectOwnership(req,res,next){
    if(req.isAuthenticated()){
	Project.findById(req.params.id,function(err,foundProject){
		if(err)
		res.redirect("back");
		else
		if(foundProject.author.id.equals(req.user._id)){
		next();
		}
		else{
		res.redirect("back");
		}
		});

    }
    else{
	var nope =" You need to be logged in homie";
	res.redirect("back");
	console.log(nope);
    }

};
module.exports = router;

