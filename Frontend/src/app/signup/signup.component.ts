import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizeService } from '../authorize.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
student={
  fname:"",
  lname:"",
  email:"",
  phone:"",
  address:"",
  gender:"",
  password:"",
  photo:"",
  qualification:"",
  dob:"",
  category:"student"
}
professor={
  fname:"",
  lname:"",
  email:"",
  phone:"",
  address:"",
  gender:"",
  password:"",
  photo:"",
  qualification:"",
  dob:"",
  experience:"",
  courses:"",
  category:"professor"
}
image:any;
pwd2Valid : boolean=true;
submitted : boolean=false;
 force = 0;
 PwdValidDis : boolean =false;
 pwdPatern   : boolean = false;
 genderValid:boolean=true;
 password2:any;
 data:any;
  constructor(private authservice:AuthorizeService,private router:Router) { }

  ngOnInit(): void {
    this.pwd2Valid = true;
    this.submitted = false;
    this.force     = 0;
    this.PwdValidDis = false;
  }
  validatePwd2(event: KeyboardEvent){
    
    if (this.student.password==this.password2){
        this.pwd2Valid = true;
    }
    else {      
      this.pwd2Valid = false;
      console.log(`inside else ${this.pwd2Valid}`)}
    }
    validatePwd2p(event: KeyboardEvent){
      if (this.professor.password==this.password2){
        this.pwd2Valid = true;
    }
    else {      
      this.pwd2Valid = false;
      console.log(`inside else ${this.pwd2Valid}`)
    }
    }
  

  selectImage(event : any) {
    console.log('select image')
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
      console.log('inside if event')
    }  
  }
  gendercheck(){
    if(this.student.gender!=""){
    if(this.student.gender=="Male"||this.student.gender=="Female"||this.student.gender=="Transgender"){
      return this.genderValid=true;}
      else{
        return this.genderValid=false;
      }
    }
    else{
      if(this.professor.gender=="Male"||this.professor.gender=="Female"||this.professor.gender=="Transgender"){
        return this.genderValid=true;}
        else{
          return this.genderValid=false;
        }
    }

  }
  validatePasswordStrength()
  {
    // console.log('validate password strength');
    this.PwdValidDis = true;
    this.pwdPatern = false;
    let strength = {
        1: 'Very Weak',
        2: 'Weak',
        3: 'Medium',
        // 4: 'Strong',
        4: 'Very Strong'
      };

      let strengthValue = {
        'caps': false,
        'length': false,
        // 'special': false,
        'numbers': false,
        'small': false
      };
     if(this.student.password!=""){
      if(this.student.password.length >= 8) {
        strengthValue.length = true;
      } 
      for(let index=0; index < this.student.password.length; index++) 
      {
          let char = this.student.password.charCodeAt(index);
          if(!strengthValue.caps && char >= 65 && char <= 90) {
              strengthValue.caps = true;
          } else if(!strengthValue.numbers && char >=48 && char <= 57){
            strengthValue.numbers = true;
          } else if(!strengthValue.small && char >=97 && char <= 122){
            strengthValue.small = true;
          } else if(!strengthValue.numbers && char >=48 && char <= 57){
            strengthValue.numbers = true;
          } 
          // else if(!strengthValue.special && (char >=33 && char <= 47) || (char >=58 && char <= 64)) {
          //   strengthValue.special = true;
          // }
      }}
      else{
        if(this.professor.password.length >= 8) {
          strengthValue.length = true;
        } 
        for(let index=0; index < this.professor.password.length; index++) 
        {
            let char = this.professor.password.charCodeAt(index);
            if(!strengthValue.caps && char >= 65 && char <= 90) {
                strengthValue.caps = true;
            } else if(!strengthValue.numbers && char >=48 && char <= 57){
              strengthValue.numbers = true;
            } else if(!strengthValue.small && char >=97 && char <= 122){
              strengthValue.small = true;
            } else if(!strengthValue.numbers && char >=48 && char <= 57){
              strengthValue.numbers = true;
            } 
            // else if(!strengthValue.special && (char >=33 && char <= 47) || (char >=58 && char <= 64)) {
            //   strengthValue.special = true;
            // }
        }
      }
    
      this.force = 0; 
      if(strengthValue ['caps']  === true) 
        {
          this.force++;
        }  
      if(strengthValue ['length']  === true) 
        {
          this.force++;
        }       
      if(strengthValue ['numbers']  === true) 
        {
          this.force++;
        }      
      if(strengthValue ['small']  === true) 
        {
          this.force++;
        }   
      if (this.force==4){
        this.pwdPatern = true;
      }
        console.log(`the force ${this.force }`);
      // for(let metric in strengthValue) 
      //   {
      //    if(strengthValue ['caps']  === true) 
      //     {
      //      strengthIndicator++;
      //     }
      //   }  
  }
signups(formvalue:NgForm){
  this.authservice.newEntry(this.image, this.student).subscribe((data)=>{
    if(data.message!=""){
      alert("Student already exists.Please change email");}
      else{
        alert("Student added successfully");
        this.router.navigate(['']);
      }
    })
}
signupp(formvalue:NgForm){
  this.authservice.newEntry(this.image, this.professor).subscribe((data)=>{
    if(data.message!=""){
      alert("Professor already exists.Please change email");}
      else{
        alert("Professor added successfully");
        this.router.navigate(['']);
      }
    })
}
}
