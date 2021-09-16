import { Component, OnInit } from '@angular/core';
import { CourseserviceService } from '../courseservice.service';

@Component({
  selector: 'app-studentapplication',
  templateUrl: './studentapplication.component.html',
  styleUrls: ['./studentapplication.component.css']
})
export class StudentapplicationComponent implements OnInit {
students=[{
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
  category:"",
  courseapplied:""
}]
user:any;
apply={email:"",courseid:"",instructor:""}
  constructor(private course:CourseserviceService) { }

  ngOnInit(): void {
    let user=localStorage.getItem('currentUser');
    this.course.getStudentapp(user)
    .subscribe((data)=>{
      this.students=JSON.parse(JSON.stringify(data));
    })

  }
  acceptapply(student:any){
     this.apply.email=student.email;
     this.apply.courseid=student.courseapplied;
     this.user=localStorage.getItem('currentUser');
     this.apply.instructor=this.user;
     this.course.student_apply(this.apply)
     .subscribe((data)=>{
       alert("Application has been accepted");
     })
  }
  rejectapply(student:any){
    this.apply.email=student.email;
    this.apply.courseid=student.courseapplied;
    this.user=localStorage.getItem('currentUser');
    this.apply.instructor=this.user;
    this.course.student_reject(this.apply)
    .subscribe((data)=>{
      this.students=this.students.filter(s=> s!==student)
    })
 }
}
