const express=require("express");
const app=express();
const Coursedata=require("../model/Coursedata");
const Profiledata=require("../model/Profiledata");
const profrouter=express.Router();
const multer=require('multer');
app.use(express.urlencoded({extended:true}));
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vijayprof79@gmail.com',
    pass: 'Vijay@79'
  }
});




var coursearray=[];     
function router(tokverify,storage){
   profrouter.post('/createcourse',tokverify,(req,res)=>{
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
  profrouter.get('/studentlist/:email',tokverify,(req,res)=>{
    const email=req.params.email;
    
    coursearray=[];
    Coursedata.find({instructor:email})
    .then(function(courses){
      
      for(i=0;i<courses.length;i++){
       coursearray.push(courses[i].courseid);
      }
      Profiledata.find({$and:[{courseapplied:{$in:coursearray}},{courseapproval:false}]})
      .then(function(students){
        
        res.send(students);
      })
    })
    
    
  })
  profrouter.put('/studentlist/accept',tokverify,(req,res)=>{
    console.log(req.body.item.courseid)
  Profiledata.findOneAndUpdate({email:req.body.item.email},{$set:{"courseapproval":true}})
  .then(function(){  
  Coursedata.updateOne({courseid:req.body.item.courseid},{$inc:{studentcount:1} 
  
  })
   .then(function(courses){
     var mailOptions = {
       from: 'vijayprof79@gmail.com',
        to: req.body.item.email,
       subject: 'Your application has been approved',
      
       html:`<p>'Congratulations!! Your have been successfully enrolled to the below given course.<br>
       Course ID:${req.body.item.courseid}</p>`
     };
     transporter.sendMail(mailOptions, function(error, info){
       if (error) {
         console.log(error);
       } else {
         console.log('Email sent: ' + info.response);
       }
     });
            res.send();
          })
        });
      })
        profrouter.put('/studentlist/reject',tokverify,(req,res)=>{
    
          Profiledata.findOneAndUpdate({email:req.body.item.email},{$set:{"courseapplied":""} 
          
          })
           .then(function(){
             var mailOptions = {
               from: 'vijayprof79@gmail.com',
                to: req.body.item.email,
               subject: 'Your application has been rejected',
              
               html:`<p>'Sorry!! We cannot enroll you at the moment.Please feel free to choose another course</p>`
             };
             transporter.sendMail(mailOptions, function(error, info){
               if (error) {
                 console.log(error);
               } else {
                 console.log('Email sent: ' + info.response);
               }
             });
                    res.send();
                  })
                });

return profrouter;
}
module.exports=router;