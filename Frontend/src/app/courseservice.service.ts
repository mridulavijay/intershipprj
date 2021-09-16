import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CourseserviceService {
  course={
    name:"",
    duration:"",
    phours:"",
    courseid:"",
    fees:"",
    instructor:"",
    image:""
    }
  constructor(public http:HttpClient) { }
  addCourse(course:any){
   return this.http.post<any>("http://localhost:3000/profhome/createcourse",{"item":course});
  }
  fetchProfile(email:any){
    return this.http.get("http://localhost:3000/profile/"+email);
  }
  getCourse(){
    return this.http.get("http://localhost:3000/studenthome/course");
  }
  courseapply(detail:any){
  return this.http.put<any>("http://localhost:3000/studenthome/course/apply",{"detail":detail});
  }
  getStudentapp(email:any){
    return this.http.get("http://localhost:3000/profhome/studentlist/"+email);
  }
  student_apply(item:any){
    return this.http.put<any>("http://localhost:3000/profhome/studentlist/accept",{"item":item});
  }
  student_reject(item:any){
    return this.http.put<any>("http://localhost:3000/profhome/studentlist/reject",{"item":item});
  }
}
