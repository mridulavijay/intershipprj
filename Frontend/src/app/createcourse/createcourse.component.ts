import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { CourseserviceService } from '../courseservice.service';
@Component({
  selector: 'app-createcourse',
  templateUrl: './createcourse.component.html',
  styleUrls: ['./createcourse.component.css']
})
export class CreatecourseComponent implements OnInit {
course={
name:"",
duration:"",
phours:"",
courseid:"",
fees:"",
instructor:"",
image:""

}
  constructor(private courseser:CourseserviceService,private router:Router) { }

  ngOnInit(): void {
  }
createcourse(formvalue:NgForm){
  this.courseser.addCourse(this.course)
  .subscribe((data)=>{
    if(data.message==""){
      alert("Course created!!!")
      this.router.navigate(['/studenthome']);
    }
    else{
      alert("Course already exists.Please change courseid");
    }
  })
}
}
