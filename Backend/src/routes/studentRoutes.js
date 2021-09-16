const express=require("express");
const app=express();
const studentrouter=express.Router();
const Coursedata=require("../model/Coursedata");

const nodemailer = require('nodemailer');
const Profiledata = require("../model/Profiledata");





app.use(express.urlencoded({extended:true}));

function router(tokverify){
    
    studentrouter.get('/course',tokverify,function(req,res){
       
        Coursedata.find()
        .then(function(courses){
            res.send(courses);
          })

      });

      studentrouter.put('/course/apply',tokverify,function(req,res){
       
        Coursedata.findOne({courseid:req.body.detail.courseid})
        .then(function(courses){
            if(courses.studentcount==40||courses.studentcount>40){
              res.send({message:"Maximum number of students have been enrolled"});}
              else{
                Profiledata.findOne({email:req.body.detail.email})
                .then(function(student){
                  if(student.courseapplied==""){
                    Profiledata.updateOne({email:req.body.detail.email},{$set:{"courseapplied":req.body.detail.courseid}})
                    .then(function(){
                      res.send({message:""});
                    })
                  }
                  else{
                    res.send({message:"You can apply only for one course at a time!!"});
                  }
                })
              }
            })
          });

      
   
    // adminrouter.get('/requests/accept/:id',tokverify,function(req,res){
        
    //  const id = req.params.id;
     
    //     var empdetails=emp[Math.floor(Math.random() * emp.length)];
         
    //    Trainerdata.findByIdAndUpdate(id,{$set:{"approved":true,
    //    "employment" :emp[Math.floor(Math.random() * emp.length)]} 
       
    //    })
    //     .then(function(trainers){
    //       var mailOptions = {
    //         from: 'tmsadmn@gmail.com',
    //          to: trainers.email,
    //         subject: 'Selected as a Trainer at ICT',
           
    //         html:`<p>'Congratulations!! you have been selected as a trainer at ICT.Please find the details below:<br>
    //         Type of employment:${empdetails},Trainer ID:${trainers.ID}</p>`
    //       };
    //       transporter.sendMail(mailOptions, function(error, info){
    //         if (error) {
    //           console.log(error);
    //         } else {
    //           console.log('Email sent: ' + info.response);
    //         }
    //       });
    //              res.send(trainers);
    //            })
     
    //      });
 
 
  
    
return studentrouter;
}
module.exports=router;
