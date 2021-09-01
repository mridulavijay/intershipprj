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
}
