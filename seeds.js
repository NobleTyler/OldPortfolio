var mongoose = require("mongoose");
var Project = require("./models/project");
var Comment = require("./models/comment");
var data=[
		{name:"SwipOrBut",description:"This was an android app I made to test swipes versus buttons",image:"https://amp.businessinsider.com/images/57179035910584e73c8bda62-750-563.jpg"},
		{name:"FreshBooks",description:"A java backend with a jsp frontend and derby database",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRASrpGGY1uAe5h09cv0MGi58b31DjizbGpI3cDmbsRuXfv45Ew"},
		{name:"SleepEKoala",description:"This was an android app which set koala based alarms to wake you up",image:"https://www.petmd.com/sites/default/files/Acute-Dog-Diarrhea-47066074.jpg"}
		]

function seedDB(){
    //removes projects
    Project.deleteMany({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed projects"); //adds a few projects
/*    data.forEach(function(seed){
        Project.create(seed,function(err,project){
            if(err)
                console.log(err);
            else
                console.log("added Campground");
            
            //create a comment
            Comment.create({
                text:"This project is amazing this guy should be hired",
                author:"Old Boss"
            },function(err,comment){
                if(err)
                    console.log("No comment was added it errored");
                else{
                project.comments.push(comment);
                project.save();
                console.log("created new comment");
                    
                }
            });
                    });
    });
   */
    });
}
 
 module.exports = seedDB;
