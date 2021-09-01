const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://userone:userone@ictakfiles.honye.mongodb.net/coursemanagement",{
   useNewUrlParser:true,
  useUnifiedTopology:true
});
//mongoose.connect("mongodb://localhost:27017/librarycase")
const Schema=mongoose.Schema;
const ProfileSchema= new Schema({
  firstname:String,
  lastname:String,
  email:String,
  phone:String,
  address:String,
  gender:String,
  password:String,
  photo:String,
  qualification:String,
  dob:String,
  experience:Number,
  courses:String,
  category:String
   
});
var Profiledata=mongoose.model("profiledata",ProfileSchema);
module.exports=Profiledata;