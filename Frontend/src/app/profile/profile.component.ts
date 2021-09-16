import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CourseserviceService } from '../courseservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
item={
  firstname:"",
  lastname:"",
  email:"",
  phone:"",
  address:"",
  gender:"",
  password:"",
  photo :"",
  qualification:"",
  dob:"",
  experience:"",
  courses:"",
  category:""
}
  constructor(private course:CourseserviceService) { }

  ngOnInit(): void {
    let email=localStorage.getItem('currentUser');
    console.log(email)
  this.course.fetchProfile(email)
  .subscribe((data)=>{
    console.log(data);
    this.item=JSON.parse(JSON.stringify(data));
  })
  }
usercat(){
  let cat=localStorage.getItem('category');
  if(cat=="professor"){
    return true;
  }
  else{
    return false;
  }
}
}
