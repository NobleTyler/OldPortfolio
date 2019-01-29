var express = require("express");
var router = express.Router();
var Project =require("../models/project");
var Comment = require("../models/comment");
//---------Comment routes----------------
router.get("/new",isLoggedIn ,function(req, res) {
	Project.findById(req.params.id,function(err,project){
		if(err){
			console.log(err);
		} else{
			res.render("comments/new", {project: project });
		}
	});
});
//cooment creation
router.post("/",isLoggedIn,function(req,res){
	Project.findById(req.params.id,function(err, project) {
		if(err){
			console.log(err);
			res.redirect("/projects")
		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err)
					console.log(err);
				else{
					comment.author.id= req.user._id;
					comment.author.username= req.user.username;
					comment.save();
					project.comments.push(comment);
					comment.author.

						project.save();
					res.redirect('/projects/'+ project._id);
				}
			});
		}
	});
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
module.exports = router;

