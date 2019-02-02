var express = require("express");
var router  = express.Router({mergeParams: true});
var Project = require("../models/project");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new",middleware.isLoggedIn, function(req, res){
	console.log(req.params.id);
	Project.findById(req.params.id, function(err, project){
		if(err){
		console.log(err);
		} else {
		res.render("comments/new", {project: project});
		}
		})
	});

//Comments Create
router.post("/",middleware.isLoggedIn,function(req, res){
	Project.findById(req.params.id, function(err, project){
		if(err){
		console.log(err);
		res.redirect("/projects");
		} else {
		Comment.create(req.body.comment, function(err, comment){
			if(err){
			req.flash("error","Something went wrong");
			} else {
			comment.author.id = req.user._id;
			comment.author.username = req.user.username;
			comment.save();
			project.comments.push(comment);
			project.save();
			req.flash("success","Success added comment!");
			res.redirect('/projects/' + project._id);
			}
			});
		}
		});
});

router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Project.findById(req.params.id,function(err,foundProject){
		if(err || !foundProject){
		req.flash("error","Project was not found");
		res.redirect("back");
		} 
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err)
			res.redirect("back");
			else
			res.render("comments/edit",{project_id: req.params.id,comment:foundComment});
			});
		});
	});
//comment update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,
		    updatedComment){
		if(err){
		res.redirect("back");
		} else {
		res.redirect("/projects/" + req.params.id );
		}
		});
	});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	//findByIdAndRemove
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
		res.redirect("back");
		} else {
		req.flash("success", "Comment deleted");
		res.redirect("/projects/" +
			req.params.id);
		}
		});
	});
module.exports = router;
