var express = require("express"),
		app = express(),
 bodyParser = require("body-parser"),
   mongoose = require("mongoose"),
   Project = require("./models/project"),
   Comment = require("./models/comment"),
   seedDB = require("./seeds")
   ;
   
mongoose.connect("mongodb://localhost:27017/Portfolio", {useNewUrlParser: true});
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"))
seedDB();

app.get("/", function(req,res){
	res.render("landing");
});

//index
app.get("/projects",function(req,res){
	Project.find({},function(err,allProjects){
		if(err)
			console.log("It messed up at retrieving projects.");
		else
			res.render("projects/index",{projects:allProjects});
			})
});
//create
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
//new
app.get("/projects/new",function(req,res){
	res.render("projects/new");
});
//show
app.get("/projects/:id",function(req, res) {
   //find project with id
   Project.findById(req.params.id).populate("comments").exec(function(err,foundProject){
   	if(err)
   		console.log("project find didnt work");
   	else
   		res.render("projects/show",{project: foundProject});
   });
   //render show project
});



app.get("/", function(req,res){
	res.render("landing");
});

//---------Comment routes----------------
app.get("/projects/:id/comments/new",function(req, res) {
	Project.findById(req.params.id,function(err,project){
		if(err){
			console.log(err);
		} else{
			res.render("comments/new", {project: project });
		}
	});
});

app.post("/projects/:id/comments",function(req,res){
	Project.findById(req.params.id,function(err, project) {
	    if(err){
	    	console.log(err);
	   	res.redirect("/projects")
	    }else{
	    	Comment.create(req.body.comment,function(err,comment){
	    		if(err)
	    			console.log(err);
	    		else
	    			project.comments.push(comment);
	    			project.save();
	    			res.redirect('/projects/'+ project._id);
	    	});
	    }
	});
});
//Use for local machine

//app.listen(port, () => console.log(`Portfolio initialized on port ${port}!`));

//Use for cloud9
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Portfolio Server Has Started!");
});