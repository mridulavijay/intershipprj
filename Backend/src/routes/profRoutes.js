const express=require("express");
const app=express();
const Coursedata=require("../model/Coursedata");
const profrouter=express.Router();
const multer=require('multer');
app.use(express.urlencoded({extended:true}));

      
function router(tokverify,storage){
   profrouter.post('/createcourse',(req,res)=>{
      Coursedata.find({courseid:req.body.item.courseid},(err,resp)=>{
        if(resp.length==0){
          var item={
            coursename:req.body.item.name,
         courseid:req.body.item.courseid,
       duration:req.body.item.duration,
      practicalh:req.body.item.phours,
      instructor:req.body.item.instructor,
       fee:req.body.item.fees,
       image:req.body.item.image,
      studentcount:0
          }
          var Courseitem=Coursedata(item);
        Courseitem.save();
        res.send({message:""});
        }
        else{
          res.send({message:"Course exists with same courseID"});

        }

      })
      
   })
  // userrouter.get('/trainerprofile/:email',tokverify,(req,res)=>{
  //   const email=req.params.email;
    
  //   Trainerdata.findOne({$and:[{"email":email},{"approved":true}]})
  //   .then(function(trainer){
  //     res.send(trainer);
  //   })
  // }
  // )
  // userrouter.put('/trainerprofile/edit',tokverify,(req,res)=>{
  //  coursedata2='';
  //   objcourse2=JSON.parse(req.body.ictakcourses);
  //               for(i=0;i<objcourse2.length;i++){
  //                   if(i==0){
  //                   coursedata2=coursedata2.concat(objcourse2[i].name)}
  //                   else{
  //                       coursedata2=coursedata2.concat(',',objcourse2[i].name);
  //                   }
  //               }
  //   Trainerdata.findByIdAndUpdate({"_id":req.body._id},{$set:{"skillset":req.body.skillset,
  // "ictakcourses":coursedata2}})
  //  .then(function(){
  //    res.send();
  //  })
    
  // })
return profrouter;
}
module.exports=router;