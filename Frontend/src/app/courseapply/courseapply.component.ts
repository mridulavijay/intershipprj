import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CourseserviceService } from '../courseservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-courseapply',
  templateUrl: './courseapply.component.html',
  styleUrls: ['./courseapply.component.css'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed', style({ height: '0px' })),
      state('expanded', style({ height: '*'})),
      transition('expanded <=> collapsed',
        animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
 
})
export class CourseapplyComponent implements OnInit {
  courses=[{
    coursename:"",
    duration:"",
    practicalh:"",
    courseid:"",
    fee:"",
    instructor:"",
    image:""
    }] 
   state='collapsed';
   applydetail={courseid:"",
  email:""}
  user:any;
  anchor:any;
  constructor(private course:CourseserviceService,private router:Router) { }
  
  ngOnInit(): void {
    this.course.getCourse()
    .subscribe((data)=>{
      this.courses=JSON.parse(JSON.stringify(data));
    })
  }
  toggleview():void{
    // this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
  this.anchor=document.getElementById("bttn")?.getAttribute("aria-expanded");
  console.log(this.anchor)
  if(this.anchor=="false"){
    this.anchor="true";
  }
else{
 this.anchor="false";
}
document.getElementById("bttn")?.setAttribute("aria-expanded",this.anchor);
  }
 course_fetch(courseid:any){
this.user=localStorage.getItem('currentUser');
 this.applydetail.courseid=courseid;
 this.applydetail.email=this.user;
 this.course.courseapply(this.applydetail)
 .subscribe((data)=>{
   if(data.message==""){
     alert("Application submitted successfully");
     this.router.navigate(['/sidebar']);
   }
   else{
     alert(data.message);
   }
 })
 }
}
