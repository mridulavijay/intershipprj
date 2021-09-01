const express=require("express");
const app=express();
const Bcrypt=require('bcryptjs');
const path=require('path');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const multer=require('multer');
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({extended:true}));
const PORT=process.env.PORT||3000;

const Profiledata = require("./src/model/Profiledata");
const storage = multer.diskStorage({
    
  destination : function(req, file, cb) {
      cb(null,__dirname+'/public/images')},
     

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
      
}
  
  
}) ;  
//Token function for verification//
function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }
//Router declarations//
const profrouter=require("./src/routes/profRoutes")(verifyToken,storage)
//const adminrouter=require("./src/routes/adminRoutes")(verifyToken)
app.use('/profhome',profrouter);
app.use('/profhome/createcourse',profrouter);
//app.use('/adminhome',adminrouter);

//signup call for backend//
app.post('/signup',function(req,res){
  
  
  
     
        let upload = multer({ storage: storage}).single('file');
                 
        upload(req, res,function(err) {
         
     // req.file contains information of uploaded file
     // req.body contains information of text fields, if there were any
     Profiledata.find({"email":req.body.email},(err,resp)=>{
       if(resp.length==0){
        pass_hash = Bcrypt.hashSync(req.body.password, 10); //password hashing//
            if (!req.file) {
         
                console.log('Please select an image to upload');
           }
         else if(err){
                console.log(err);
          } 
        else{
               if(req.body.category=="professor"){
                var item={
                firstname:req.body.firstname,
                lastname:req.body.lastname,
               email:req.body.email,
                phone:req.body.phone,
                address:req.body.address,
              qualification:req.body.qualification,
                 gender:req.body.gender,
                 password:pass_hash,
                 photo:'http://localhost:3000/images/'+req.file.filename,
                 dob:req.body.DoB,
                 
                 experience:req.body.experience,
                  courses:req.body.courses,
                 category:req.body.category
          }}
          else{
            var item={
              firstname:req.body.firstname,
              lastname:req.body.lastname,
             email:req.body.email,
              phone:req.body.phone,
              address:req.body.address,
            qualification:req.body.qualification,
               gender:req.body.gender,
               password:pass_hash,
               photo:'http://localhost:3000/images/'+req.file.filename,
               dob:req.body.DoB,
               category:req.body.category
        }
          }
       
         var Profile=Profiledata(item);
         Profile.save();
       
        
     }
   

 res.send({message:""});
}
      else{
          res.send({message:"Student/Professor already registered.Please use different EmailId"});
          
      }

  
  })

  })
})

// login
 app.post('/login',function(req,res) {
    pass_hash = Bcrypt.hashSync(req.body.profile.password, 10);
   var email = req.body.profile.email;
     
          Profiledata.findOne({email:email},function(err,user) {

              if(err) throw new Error(err);
            if(!user) 
              { res.status(401).send('User not registered.Please sign up');}
               if(user){
              if(Bcrypt.compareSync(req.body.profile.password, user.password))
                   {
                  
                    let payload = {subject: req.body.email+req.body.password}
                     let token = jwt.sign(payload, 'secretKey')

                         res.status(200).send({tok:token,category:user.category})}
               else{
                res.status(401).send('Invalid credentials');
              }
                  
              
              }

      });

   });
    
  



app.listen(3000);
