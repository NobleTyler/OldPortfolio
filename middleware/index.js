var project = require("../models/project");
var Comment = require("../models/comment");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkprojectOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
	project.findById(req.params.id, function(err, foundproject){
		if(err){
		req.flash("error", "project not found");
		res.redirect("back");
		}  else {
		// does
		// user
		// own
		// the
		// project?
		if(foundproject.author.id.equals(req.user._id))
		{
		next();
		}
		else
		{
		req.flash("error","Permissions denied");
		res.redirect("back");
		}
		}
	});
    } else {
	req.flash("error", "You need to be logged in to do that");
	res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
		res.redirect("back");
		}  else {
		// does user own
		// the comment?
		if(foundComment.author.id.equals(req.user._id))
		{
		next();
		}
		else
		{
		req.flash("error","Permissions denied");
		res.redirect("back");
		}
		}
	});
    } else {
	req.flash("error", "Login required");
	res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
	return next();
    }
    req.flash("error", "Login required.");
    res.redirect("/login");
}

module.exports = middlewareObj;
