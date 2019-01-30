var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	Project = require("./models/project"),
	Comment = require("./models/comment"),
	passport = require("passport"),
	LocalStrategy= require("passport-local"),
	User = require("./models/user"),
	seedDB = require("./seeds")
 
//Required Routes
var commentRoutes = require('./routes/comments'),
	projectsRoutes = require ('./routes/projects'),
	indexRoutes = require('./routes/index') 

mongoose.set('useCreateIndex',true);   
mongoose.connect("mongodb://localhost:27017/Portfolio",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"))
app.set("view engine","ejs");

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Please for the love of god let this work",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});
app.use("/",indexRoutes);
app.use("/projects",projectsRoutes);
app.use("/projects/:id/comments",commentRoutes);

const port = 3000;
app.listen(port, () => console.log(`Portfolio initialized on port ${port}!`));

/*Use for cloud9
/*app.listen(process.env.PORT, process.env.IP, function(){
/*   console.log("The Portfolio Server Has Started!");
});*/
