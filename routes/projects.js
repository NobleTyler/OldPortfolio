var express = require("express");
var router  = express.Router();
var project = require("../models/project");
var middleware = require("../middleware");


//INDEX - show all projects
router.get("/", function(req, res){
	// Get all projects from DB
	project.find({}, function(err, allprojects){
		if(err){
		console.log(err);
		} else {
		res.render("projects/index",{projects:allprojects});
		}
		});
	});

//CREATE - add new project to DB
router.post("/", middleware.isLoggedIn, function(req, res){
	// get data from form and add to projects array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
id: req.user._id,
username: req.user.username
}
var newproject = {name: name, image: image,
description: desc, author:author}
// Create a new project and save to DB
project.create(newproject,
    function(err, newlyCreated){
    if(err){
    console.log(err);
    }
    else
    {
    //redirect
    //back
    //to
    //projects
    //page
    console.log(newlyCreated);
    res.redirect("/projects");
    }
    });
});

//NEW - show form to create new project
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("projects/new"); 
	});

// SHOW - shows more info about one project
router.get("/:id", function(req, res){
	//find the project with provided ID
	project.findById(req.params.id).populate("comments").exec(function(err,
		    foundProject){
		if(err || !foundProject ){
		req.flash("error","Project not found");
	    	res.redirect("backr");
		} else {
		console.log(foundProject)
		//render show template
		//with that project
		res.render("projects/show",
			{project:
			foundProject});
		}
		});
	});

// EDIT project ROUTE
router.get("/:id/edit", middleware.checkprojectOwnership, function(req, res){
	project.findById(req.params.id, function(err, foundProject){
		res.render("projects/edit", {project: foundProject});
		});
	});

// UPDATE project ROUTE
router.put("/:id",middleware.checkprojectOwnership, function(req, res){
	// find and update the correct project
	project.findByIdAndUpdate(req.params.id, req.body.project, function(err,
		    updatedproject){
		if(err){
		res.redirect("/projects");
		} else {
		//redirect somewhere(show page)
		res.redirect("/projects/"
			+ req.params.id);
		}
		});
	});

// DESTROY project ROUTE
router.delete("/:id",middleware.checkprojectOwnership, function(req, res){
	project.findByIdAndRemove(req.params.id, function(err){
		if(err){
		res.redirect("/projects");
		} else {
		res.redirect("/projects");
		}
		});
	});


module.exports = router;


