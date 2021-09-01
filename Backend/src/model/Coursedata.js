const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://userone:userone@ictakfiles.honye.mongodb.net/coursemanagement",{
   useNewUrlParser:true,
  useUnifiedTopology:true
});
//mongoose.connect("mongodb://localhost:27017/librarycase")
const Schema=mongoose.Schema;
const CourseSchema= new Schema({
  coursename:String,
  courseid:String,
  duration:String,
 practicalh:Number,
 instructor:String,
 fee:String,
 studentcount:Number,
 image:String  
});
var Coursedata=mongoose.model("coursedata",CourseSchema);
module.exports=Coursedata;